import { SSR } from '@symbiotejs/symbiote/node/SSR.js';
import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 3000;
const DIST_DIR = path.resolve('./dist');
const ROOT_DIR = path.resolve('.');

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
};

console.log('Initializing SSR environment...');
await SSR.init();
await import('./node-imports.js');
console.log('SSR environment ready.');

// Pre-read template parts:
const tpl = fs.readFileSync('./node/mein-tpl.html', 'utf-8');
const [head, tail] = tpl.split('{{CONTENT}}');

/**
 * @param {string} filePath
 * @param {http.ServerResponse} res
 */
function serveFile(filePath, res) {
  try {
    let stat = fs.statSync(filePath);
    if (stat.isFile()) {
      let ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
      return true;
    }
  } catch {
    // file not found
  }
  return false;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (url.pathname !== '/') {
    // 1st: try dist/ (static assets served from root)
    let distPath = path.join(DIST_DIR, url.pathname);
    if (serveFile(distPath, res)) return;

    // 2nd: try project root (app/, components/, sections/ for ESM)
    let rootPath = path.join(ROOT_DIR, url.pathname);
    if (serveFile(rootPath, res)) return;

    res.writeHead(404);
    res.end('Not found');
    return;
  }

  // SSR streaming for root:
  let nonce = Date.now().toString(36);
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write(head);

  for await (let chunk of SSR.renderToStream('app-shell', {}, { nonce })) {
    res.write(chunk);
  }

  res.end(tail);
});

server.listen(PORT, () => {
  console.log(`\nSSR streaming server: http://localhost:${PORT}\n`);
});
