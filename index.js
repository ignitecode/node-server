const http = require('http') // Why didn't we have to npm install this?
const urlParser = require('url');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const server = http.createServer().listen(PORT);

console.log(`[INFO] Server listening on port: ${PORT}`);

server.on('request', (req, res) => {
  const urlObject = urlParser.parse(req.url);

  // Write a content-type header letting the browser know how to render the response
  res.writeHead(200, {'Content-Type': 'text/html'});

  console.log('[INFO] Request URL: ', urlObject);
  console.log('[INFO] Path: ', urlObject.pathname);

  // Write the intro HTML every time no matter the path
  res.write('<html>');
  res.write(`<h1>Tom Cruise Movies</h1>`);
  res.write(`<p>Search and filter a whole bunch of tom cruises hit movies!</p>`);
  res.write('<ul>')

  switch (urlObject.pathname) {
    case '/':
      // For Each Movie
      getMovies().forEach(movie => {
        res.write(`<li>${movie.Title}</li>`)
      });
      break;
    default:
      res.write('<li>Sorry I didnt recognize that route!</li>');
  }

  res.write('</ul>')
  res.write('</html>')
  res.end();
});

/**
 * Returns a list of Tom cruise Movies
 * after the data has been read from the makeshift
 * database (data.json) file.
 */
const getMovies = () => {
  const movies = fs.readFileSync('./data.json');
  return JSON.parse(movies);
}
