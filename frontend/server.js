const http = require('http');
const fs = require('fs');
const path = require('path');

const startPort = Number(process.env.PORT || 3000);
const maxPort = startPort + 20;
const root = __dirname;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url === '/' ? '/login.html' : req.url;
  reqPath = reqPath.split('?')[0];
  const filePath = path.join(root, reqPath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

function tryListen(port) {
  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE' && port < maxPort) {
      console.log(`Port ${port} is busy, trying ${port + 1}...`);
      server.removeAllListeners('error');
      tryListen(port + 1);
    } else {
      throw err;
    }
  });

  server.listen(port, () => {
    console.log(`Frontend server running at http://localhost:${port}`);
  });
}

tryListen(startPort);
