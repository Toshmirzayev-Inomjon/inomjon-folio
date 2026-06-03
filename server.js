const { createServer } = require("http");
const { appendFileSync, createReadStream, existsSync, statSync } = require("fs");
const { extname, join, normalize } = require("path");

process.env.NODE_ENV = "production";

const hostname = process.env.HOST || "0.0.0.0";
const rawPort = process.env.PORT || process.env.NODE_PORT || "";
const hasExplicitPort = rawPort !== "";
const port = hasExplicitPort
  ? /^\d+$/.test(String(rawPort))
    ? Number(rawPort)
    : String(rawPort)
  : undefined;
const nextPort = typeof port === "number" ? port : undefined;
const staticRoot = join(__dirname, ".next", "static");
const buildIdPath = join(__dirname, ".next", "BUILD_ID");
const startupLogPath = join(__dirname, "startup-error.log");

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

function writeStartupLog(error) {
  const message = error instanceof Error ? `${error.stack || error.message}` : String(error);
  appendFileSync(startupLogPath, `\n[${new Date().toISOString()}]\n${message}\n`);
}

function listen(server, label) {
  if (!hasExplicitPort) {
    server.listen(() => {
      const address = server.address();
      const target =
        typeof address === "object" && address
          ? `${address.address}:${address.port}`
          : String(address || "default listener");
      console.log(`${label} on ${target}`);
    });
    return;
  }

  if (typeof port === "number") {
    server.listen(port, hostname, () => {
      console.log(`${label} on http://${hostname}:${port}`);
    });
    return;
  }

  server.listen(port, () => {
    console.log(`${label} on ${port}`);
  });
}

function startDiagnosticServer(error) {
  writeStartupLog(error);

  const server = createServer((_req, res) => {
    res.writeHead(503, {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store"
    });
    res.end(
      [
        "InomjonFolio startup failed.",
        "Check startup-error.log and stderr.log in the application root.",
        "",
        error instanceof Error ? error.message : String(error)
      ].join("\n")
    );
  });

  listen(server, "Diagnostic server ready");
}

function serveNextStatic(req, res) {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
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

function setNoCacheHeaders(res) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");
}

async function main() {
  if (!existsSync(buildIdPath)) {
    throw new Error("Production build not found. Upload and unzip next-build.zip, then restart the Node.js app.");
  }

  const next = require("next");
  const app = next({ dev: false, hostname, port: nextPort });
  const handle = app.getRequestHandler();
  await app.prepare();

  const server = createServer((req, res) => {
    if (serveNextStatic(req, res)) {
      return;
    }

    setNoCacheHeaders(res);
    handle(req, res);
  });

  listen(server, "Ready");
}

main().catch(startDiagnosticServer);
