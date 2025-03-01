"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _user = require('../models/user'); var _user2 = _interopRequireDefault(_user);

class UserController {
  async store (req, res) {
    try {
      const novoUser = await _user2.default.create(req.body);
      return res.json(novoUser);

    } catch (error) {
      console.error("Erro ao criar User:", error);
      return res.status(400).json({errors : error.errors.map((err) => err.message)});
    }
  }

  async index(req, res) {
    try {
      const users = await _user2.default.findAll({attributes: ['id', 'email', 'nome']});
      return res.json({adminId: req.userId, email: req.userEmail, users });

    } catch (error) {
      console.error("Erro ao buscar dados", error);
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        const user = await _user2.default.findByPk(id);
        const {nome, email} = user;
        return res.json({id, nome, email});
      }
      /* 
      const {key, search} = req.query;
      if (key && search) {
        const user = await User.findOne({[key]: search});
        console.log(user);
        return res.json(user);
      }
      */
    } catch (error) {
      console.error("Erro ao buscar user", error);
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const user = await _user2.default.findByPk(req.userId);
      if (!user) {
        return res.status(400).json({
          errors: ['Usuario não encontrado'],
        });
      }
      const newUser = await user.update(req.body);
      return res.json(newUser);
      
    } catch (error) {
      console.error("Erro ao Editar-PUT- user", error);
      return res.status(400).json({errors : error.errors.map((err) => err.message)});
    }
  }

  async delete(req, res) {
    try {
    const user =   await _user2.default.findByPk(req.userId);
      if (!user) {
        return res.status(400).json({
          errors: ['Usuario não encontrado'],
        });
      }
      await user.destroy();
      return res.json(user);
      
    } catch (error) {
      console.error("Erro ao Editar-PUT- user", error);
      return res.status(400).json(null);
    }
  }
}

exports. default = new UserController();