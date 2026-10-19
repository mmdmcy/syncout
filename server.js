const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = Number(process.env.PORT || 3000);
const ROOT = __dirname;
let activePort = PORT;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain'
};

function lanIPs() {
  const out = [];
  for (const list of Object.values(os.networkInterfaces())) {
    for (const i of list || []) {
      if (i.family !== 'IPv4' || i.internal) continue;
      if (/^10\.|^192\.168\./.test(i.address)) out.push(i.address);
    }
  }
  return out;
}

function handle(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname === '/api/ip') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ips: lanIPs(), port: activePort }));
    return;
  }
  let file;
  try {
    file = url.pathname === '/' ? '/index.html' : decodeURIComponent(url.pathname);
  } catch {
    res.writeHead(400);
    res.end('bad request');
    return;
  }
  const abs = path.resolve(ROOT, '.' + path.posix.normalize('/' + file));
  const rel = path.relative(ROOT, abs);
  // Serve only the web files: inside ROOT (not a sibling like ROOT-private),
  // no dot segments (.git, .gitignore), not this server, and a known type.
  if (
    !abs.startsWith(ROOT + path.sep) ||
    rel.split(path.sep).some((seg) => seg.startsWith('.')) ||
    rel === 'server.js' ||
    !Object.hasOwn(MIME, path.extname(abs).toLowerCase())
  ) {
    res.writeHead(404);
    res.end('not found');
    return;
  }
  fs.readFile(abs, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('not found');
      return;
    }
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(abs).toLowerCase()],
      'Cache-Control': 'no-cache'
    });
    res.end(data);
  });
}

function start(port) {
  const server = http.createServer(handle);
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log('  Port ' + port + ' is busy, trying ' + (port + 1) + '…');
      start(port + 1);
    } else {
      throw err;
    }
  });
  server.listen(port, '0.0.0.0', () => {
    activePort = port;
    const ips = lanIPs();
    console.log('');
    console.log('  syncout is running');
    console.log('');
    console.log('  This device:   http://localhost:' + port);
    for (const ip of ips) console.log('  Phone / TV:    http://' + ip + ':' + port);
    console.log('');
    console.log('  Open those URLs on your iPhone, TV or any device on the same Wi-Fi.');
    console.log('  Ctrl+C to stop.');
    console.log('');
  });
}

start(PORT);
