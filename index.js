// const server = require('./server');
// const PORT = process.env.PORT || 3000;

// START

// server.listen(PORT, err => {
//   if (err) {
//     return console.log('Something bad happened', err);
//   }
//   console.log(`Server is listening on port ${PORT}...`);
// });

const { crudServer } = require('./server');
crudServer.start();
