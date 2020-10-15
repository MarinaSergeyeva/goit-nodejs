const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const server = express();
const PORT = process.env.PORT || 3000;
const contactRouter = require('./routes/contactRoutes');

// MIDDLEWARES
server.use(cors({ origin: 'http://localhost:3000' }));
if (process.env.NODE_ENV === 'development') {
  server.use(morgan('dev'));
}
server.use(express.json());

// ROUTES
server.use('/api/contacts', contactRouter);

// ERRORS
server.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

server.use(globalErrorHandler);

// START
server.listen(PORT, err => {
  if (err) {
    return console.log('Something bad happened', err);
  }
  console.log(`Server is listening on port ${PORT}...`);
});

module.exports = server;
