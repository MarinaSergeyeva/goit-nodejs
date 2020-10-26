const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const contactRouter = require('./contacts/contactRoutes');
const userRouter = require('./users/userRoutes');
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
    try {
      mongoose.set('debug', true);
      await mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
      });
      console.log('Database has been connected');
    } catch (err) {
      console.log('Something bad happend while connection to DB', err);
      process.exit(1);
    }
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

    this.server.use((req, res, next) => {
      req.requestTime = new Date().toISOString();
      // console.log('req.headers', req.headers);

      next();
    });
  }

  initServerRouters() {
    this.server.use('/api/contacts', contactRouter);
    this.server.use('/api/auth', userRouter);
    this.server.use('/api/users', userRouter);
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
