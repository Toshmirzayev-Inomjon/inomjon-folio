#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-$HOME/repositories/inomjon-folio}"
NODE_ENV_DIR="${NODE_ENV_DIR:-$HOME/nodevenv/repositories/inomjon-folio/22/bin/activate}"
PUBLIC_HTML="${PUBLIC_HTML:-$HOME/public_html}"

cd "$APP_DIR"

if [ -f "$NODE_ENV_DIR" ]; then
  # shellcheck disable=SC1090
  source "$NODE_ENV_DIR"
fi

git pull origin main

if [ ! -f next-build.zip ]; then
  echo "next-build.zip topilmadi. Uni $APP_DIR ichiga upload qiling." >&2
  exit 1
fi

rm -rf .next
unzip -o next-build.zip

if [ ! -f .next/BUILD_ID ]; then
  echo ".next/BUILD_ID topilmadi. next-build.zip noto'g'ri yoki to'liq ochilmadi." >&2
  exit 1
fi

rm -rf "$PUBLIC_HTML/_next"
mkdir -p "$PUBLIC_HTML/_next"
cp -r .next/static "$PUBLIC_HTML/_next/static"

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

echo "BUILD_ID: $(cat .next/BUILD_ID)"
echo "Qavsli static path tekshiruvi:"
find .next/static -path '*(*' -o -path '*)*'

CSS="$(find .next/static/css -type f -name '*.css' | head -1)"
PAGE_JS="$(find .next/static/chunks/app -type f -name 'page-*.js' | head -1)"

echo "CSS: $CSS"
echo "Page JS: $PAGE_JS"
echo "Deploy tayyor. Endi cPanel Node.js App sahifasida Stop App -> Start App qiling."
