import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, 'public');

// Load .env if present (without overriding existing env vars)
const envPath = path.join(ROOT, '.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '');
    if (!(key in process.env)) process.env[key] = val;
  }
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.mp3': 'audio/mpeg'
};

export function createDevServer() {
  return http.createServer(async (req, res) => {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    const pathname = url.pathname;

    // Route /api/* and /.netlify/functions/* to Netlify function handlers
    if (pathname.startsWith('/api/') || pathname.startsWith('/.netlify/functions/')) {
      const fnName = pathname
        .replace(/^\/api\//, '')
        .replace(/^\/\.netlify\/functions\//, '')
        .split('/')[0];

      if (!/^[a-z0-9_-]+$/i.test(fnName)) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'Not found' }));
        return;
      }

      const fnPath = path.join(ROOT, 'netlify', 'functions', `${fnName}.mjs`);
      if (!fs.existsSync(fnPath)) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'Function not found' }));
        return;
      }

      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const body = Buffer.concat(chunks).toString('utf8');

      const queryStringParameters = {};
      for (const [k, v] of url.searchParams.entries()) {
        queryStringParameters[k] = v;
      }

      try {
        const mod = await import(`${fnPath}?t=${Date.now()}`);
        const result = await mod.handler({
          httpMethod: req.method,
          headers: req.headers,
          queryStringParameters,
          body
        });

        res.writeHead(result.statusCode || 200, result.headers || {});
        if (result.isBase64Encoded) {
          res.end(Buffer.from(result.body || '', 'base64'));
        } else {
          res.end(result.body || '');
        }
      } catch (err) {
        console.error(`Function ${fnName} error:`, err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'Internal server error' }));
      }
      return;
    }

    // Serve static files from public/
    const safeRel = path.normalize(pathname === '/' ? '/index.html' : pathname).replace(/^(\.\.[/\\])+/, '');
    let filePath = path.join(PUBLIC_DIR, safeRel);
    if (!filePath.startsWith(PUBLIC_DIR) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(PUBLIC_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 8888);
  const server = createDevServer();
  server.listen(port, '127.0.0.1', () => {
    console.log(`Hassan's birthday scrapbook running at http://127.0.0.1:${port}`);
    if (!process.env.BIRTHDAY_PASSWORD) {
      console.warn('Warning: BIRTHDAY_PASSWORD is not set. Create a .env file from .env.example.');
    }
  });
}

