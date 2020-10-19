const server = require('./server');

// START
const PORT = process.env.PORT || 3000;

server.listen(PORT, err => {
  if (err) {
    return console.log('Something bad happened', err);
  }
  console.log(`Server is listening on port ${PORT}...`);
});
