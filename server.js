const { createServer } = require("http");
const { createReadStream, existsSync, statSync } = require("fs");
const { extname, join, normalize } = require("path");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = Number(process.env.PORT || process.env.NODE_PORT || 3000);
const staticRoot = join(__dirname, ".next", "static");
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

function serveNextStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  if (!url.pathname.startsWith("/_next/static/")) {
    return false;
  }

  const relativePath = decodeURIComponent(url.pathname.replace("/_next/static/", ""));
  const filePath = normalize(join(staticRoot, relativePath));
  if (!filePath.startsWith(staticRoot) || !existsSync(filePath) || !statSync(filePath).isFile()) {
    return false;
  }

  res.writeHead(200, {
    "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream",
    "Cache-Control": "public, max-age=31536000, immutable"
  });
  createReadStream(filePath).pipe(res);
  return true;
}

app.prepare().then(() => {
  createServer((req, res) => {
    if (serveNextStatic(req, res)) {
      return;
    }

    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");

    handle(req, res);
  }).listen(port, hostname, () => {
    console.log(`Ready on http://${hostname}:${port}`);
  });
});
