const http = require('http') // Why didn't we have to npm install this?
const urlParser = require('url');


const PORT = process.env.PORT || 3000;
const server = http.createServer().listen(PORT);

console.log(`[INFO] Server listening on port: ${PORT}`);

server.on('request', (req, res) => {
  const urlObject = urlParser.parse(req.url);

  // Write a content-type header letting the browser know how to render the response
  res.writeHead(200, {'Content-Type': 'text/html'});

  console.log('[INFO] Request URL: ', urlObject);
  console.log('[INFO] Path: ', urlObject.pathname);

  res.write('<html>');
  res.write(`<h1>Books & Movies App</h1>`);
  res.write(`<h3>You have reached: ${urlObject.pathname}</h3>`);
  res.write('<ul>')

  switch (urlObject.pathname) {
    case '/':
      res.write('<a href="/books">View Books</a>');
      res.write('<br />');
      res.write('<a href="/movies">View Movies</a>');
      break;
    case '/movies':
      res.write('<li>Avengers</li>');
      res.write('<li>Hulk</li>');
      res.write('<li>Thor</li>');
      res.write('<li><a href="/">Go Back</a></li>');
      break;
    case '/books':
      res.write('<li>Harry Potter</li>');
      res.write('<li>Pet Semetary</li>');
      res.write('<li>Beowulf</li>');
      res.write('<li><a href="/">Go Back</a></li>');
      break;
    default:
      res.write('<li>Sorry I didnt recognize that route!</li>');
  }

  res.write('</ul>')
  res.write('</html>')
  res.end();
});
