import express from 'express';
import './src/models/index';

import homeRoutes from './src/routes/homeRoute';
import userRoutes from './src/routes/userRoute';
import tokensRoutes from './src/routes/tokenRoutes';
import alunoRoutes from './src/routes/alunoRoute';
import archiveRoutes from './src/routes/archiveRoute';

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
  this.app.use('/tokens', tokensRoutes);
  this.app.use('/alunos', alunoRoutes);
  this.app.use('/archive', archiveRoutes);
  }
}

export default new App().app;