const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const contactRouter = require('./contacts/contactRoutes');
const dotenv = require('dotenv');
dotenv.config();

const AppError = require('./errors/appError');
const PORT = process.env.PORT || 3000;
const globalErrorHandler = require('./errors/errorController');

const mongoose = require('mongoose');

class CrudServer {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    await this.initDatabase();
    this.initMiddlewares();
    this.initServerRouters();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  async initDatabase() {
    mongoose.set('debug', true);
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    });
    console.log('Database has been connected');
  }

  initMiddlewares() {
    this.server.use(cors({ origin: 'http://localhost:3000' }));
    if (process.env.NODE_ENV === 'development') {
      this.server.use(morgan('dev'));
    }

    if (process.env.NODE_ENV !== 'development') {
      this.server.use(morgan('combined'));
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
