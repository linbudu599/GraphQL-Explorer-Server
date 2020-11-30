const net = require('net');

async function isPortInService(port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer().listen(port);

    server.on('listening', () => {
      server.close();
      console.log(`${port} not in use`);
      resolve(false);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`${port} in server`);
        resolve(true);
      }
    });
  });
}

exports.isPortInService = isPortInService;
