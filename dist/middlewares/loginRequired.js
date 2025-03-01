"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _user = require('../models/user'); var _user2 = _interopRequireDefault(_user);

exports. default = async (req, res, next) => {
  const { authorization } = req.headers ;
  if (!authorization) {
    return res.status(401).json({errors: ['autorização recusada'],})
  }

  const [ text, token ] = String(authorization).split(' ');
  try {
    const data = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    const {id, email} = data;

    const user = await _user2.default.findOne({where: {id, email,}});

    if(!user) {
      return res.status(401).json({errors: ['Usuario inválido'],})
    }

    req.userId = id;
    req.userEmail = email;
    
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({errors: ['token inválido'],})
  }
};
