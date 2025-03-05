"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _path = require('path');
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _expressratelimit = require('express-rate-limit'); var _expressratelimit2 = _interopRequireDefault(_expressratelimit);

require('./models/index');

var _homeRoute = require('./routes/homeRoute'); var _homeRoute2 = _interopRequireDefault(_homeRoute);
var _userRoute = require('./routes/userRoute'); var _userRoute2 = _interopRequireDefault(_userRoute);
var _tokenRoutes = require('./routes/tokenRoutes'); var _tokenRoutes2 = _interopRequireDefault(_tokenRoutes);
var _alunoRoute = require('./routes/alunoRoute'); var _alunoRoute2 = _interopRequireDefault(_alunoRoute);
var _archiveRoute = require('./routes/archiveRoute'); var _archiveRoute2 = _interopRequireDefault(_archiveRoute);
var _console = require('console');

const limiter = _expressratelimit2.default.call(void 0, {
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
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.app.use(_cors2.default.call(void 0, corsOptions));
    this.app.use(_helmet2.default.call(void 0, ));
    this.app.use(limiter);
    this.app.use(_express2.default.urlencoded({extended: true}));
    this.app.use(_express2.default.json());
    this.app.use('/images/',_express2.default.static(_path.resolve.call(void 0, __dirname, '..', 'uploads', 'images')));
  }
  routes() {
  this.app.use('/', _homeRoute2.default);
  this.app.use('/users', _userRoute2.default);
  this.app.use('/tokens', _tokenRoutes2.default);
  this.app.use('/alunos', _alunoRoute2.default);
  this.app.use('/archive', _archiveRoute2.default);
  }
}

exports. default = new App().app;