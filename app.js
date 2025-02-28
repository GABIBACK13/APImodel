import express from 'express';
import './src/models/index';

import homeRoutes from './src/routes/homeRoute';
import userRoutes from './src/routes/userRoute';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(express.json());
  }
  routes() {
  this.app.use('/', homeRoutes);
  this.app.use('/users', userRoutes);
  }
}

export default new App().app;