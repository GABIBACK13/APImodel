"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }const jwt = require('jsonwebtoken');
require('dotenv').config();
var _user = require('../models/user'); var _user2 = _interopRequireDefault(_user);

class TokenController {
  async store (req, res) {
    const {email = '', password = ''} = req.body;
    if (!email || !password) {
      return res.status(400).json({errors: ['credenciais inválidas']});
    }
    const user = await _user2.default.findOne({where: { email }});
    
    if (!user) {
      return res.status(400).json({errors: ['Usuário não encontrado']});
    }
    if (!(await user.passwordValidate(password))) {
      return res.status(400).json({errors: ['Senha incorreta']});
    }
    const { id } = user;
    const token = jwt.sign({id, email}, process.env.TOKEN_SECRET, {expiresIn: process.env.TOKEN_DURATION});
    return res.json({ token, user:{ nome: user.nome, id, email}});
  }
}

exports. default = new TokenController();