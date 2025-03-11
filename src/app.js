import express from 'express';
import {resolve} from 'path';
import cors from 'cors';
import helmet from 'helmet';
import rateLimiting from 'express-rate-limit';

import './models/index';

import homeRoutes from './routes/homeRoute';
import userRoutes from './routes/userRoute';
import tokensRoutes from './routes/tokenRoutes';
import alunoRoutes from './routes/alunoRoute';
import archiveRoutes from './routes/archiveRoute';

const limiter = rateLimiting({
  windowMs: 1000 * 60 * 60 * 12,
  max: 120,
  message: "too many requests, await for a few minutes to call more"
}); 

const whiteList = [`${process.env.APP_URL}`, `${process.env.SITE_URL}`];
const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}; 

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet({
      crossOriginEmbedderPolicy: false,
    }));
    this.app.use(limiter);
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(express.json());
    this.app.use('/images/',express.static(resolve(__dirname, '..', 'uploads', 'images')));
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