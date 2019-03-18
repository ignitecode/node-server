const http = require('http') // Why didn't we have to npm install this?
const PORT = process.env.PORT || 3000;
const server = http.createServer().listen(PORT);

console.log(`[INFO] Server listening on port: ${PORT}`);

server.on('request', (req, res) => {
  console.log('[INFO] Request URL: ', req.url);

  // Write a content-type header letting the browser know how to render the response
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<html><h1>Welcome to Node!<h1></html>');
  res.end();
});
