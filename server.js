const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const contactRouter = require('./routes/contactRoutes');
const dotenv = require('dotenv');
dotenv.config();

const AppError = require('./utils/appError');
const PORT = process.env.PORT || 3000;
const globalErrorHandler = require('./controllers/errorController');

class CrudServer {
  constructor() {
    this.server = null;
  }

  start() {
    this.initServer();
    // this.initDatabase();
    this.initMiddlewares();
    this.initServerRouters();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddlewares() {
    this.server.use(cors({ origin: 'http://localhost:3000' }));
    if (process.env.NODE_ENV === 'development') {
      this.server.use(morgan('dev'));
    }
    this.server.use(express.json());
  }

  initServerRouters() {
    this.server.use('/api/contacts', contactRouter);
  }

  initErrorHandling() {
    this.server.all('*', (req, res, next) => {
      next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
    });

    this.server.use(globalErrorHandler);
  }

  startListening() {
    this.server.listen(PORT, err => {
      if (err) {
        return console.log('Something bad happened', err);
      }
      console.log(`Server is listening on port ${PORT}...`);
    });
  }
}

exports.CrudServer = CrudServer;
exports.crudServer = new CrudServer();
