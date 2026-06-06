#!/usr/bin/env bash
set -eo pipefail

APP_DIR="${APP_DIR:-$HOME/repositories/inomjon-folio}"
NODE_ENV_DIR="${NODE_ENV_DIR:-$HOME/nodevenv/repositories/inomjon-folio/22/bin/activate}"
PUBLIC_HTML="${PUBLIC_HTML:-$HOME/public_html}"
SITE_URL="${SITE_URL:-https://toshmirzayev-inomjon.online}"
DEPLOY_TMP="$APP_DIR/.next-deploy"

cd "$APP_DIR"

if [ -f "$NODE_ENV_DIR" ]; then
  set +u
  # shellcheck disable=SC1090
  source "$NODE_ENV_DIR"
  set -u
fi

set -u

git pull origin main

if [ ! -f next-build.zip ]; then
  echo "next-build.zip topilmadi. Uni $APP_DIR ichiga upload qiling." >&2
  exit 1
fi

rm -rf "$DEPLOY_TMP"
mkdir -p "$DEPLOY_TMP/.next"

# Keep previous chunks during deployment so cached HTML cannot request missing assets.
if [ -d .next ]; then
  cp -a .next/. "$DEPLOY_TMP/.next/"
fi

unzip -oq next-build.zip -d "$DEPLOY_TMP"

if [ ! -f "$DEPLOY_TMP/.next/BUILD_ID" ]; then
  echo ".next/BUILD_ID topilmadi. next-build.zip noto'g'ri yoki to'liq ochilmadi." >&2
  exit 1
fi

rm -rf .next-previous
if [ -d .next ]; then
  mv .next .next-previous
fi
mv "$DEPLOY_TMP/.next" .next
rm -rf "$DEPLOY_TMP" .next-previous

mkdir -p "$PUBLIC_HTML/_next/static"
cp -a .next/static/. "$PUBLIC_HTML/_next/static/"

if [ -f public/favicon.ico ]; then
  cp public/favicon.ico "$PUBLIC_HTML/favicon.ico"
fi

if [ -f public/.htaccess ]; then
  cp public/.htaccess "$PUBLIC_HTML/.htaccess"
fi

chmod -R 755 "$PUBLIC_HTML/_next"

npm run prisma:generate
npm run prisma:deploy
npm run prisma:seed

BUILD_ID="$(cat .next/BUILD_ID)"

# CloudLinux/Passenger watches this file and restarts the Node process.
mkdir -p tmp
touch tmp/restart.txt

echo "BUILD_ID: $BUILD_ID"
echo "Qavsli static path tekshiruvi:"
find .next/static -path '*(*' -o -path '*)*'

CSS="$(find .next/static/css -type f -name '*.css' | head -1)"
PAGE_JS="$(find .next/static/chunks/app -type f -name 'page-*.js' | head -1)"

echo "CSS: $CSS"
echo "Page JS: $PAGE_JS"
echo "Node restart signali yuborildi: tmp/restart.txt"
echo "Deploy tayyor. 10 soniyadan keyin quyidagini tekshiring:"
echo "curl -sS '$SITE_URL/_deploy-health?build=$BUILD_ID'"
