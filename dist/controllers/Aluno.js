"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _alunos = require('../models/alunos'); var _alunos2 = _interopRequireDefault(_alunos);
var _files = require('../models/files'); var _files2 = _interopRequireDefault(_files);


class AlunoController {
  async index (req, res) {
    try {
      const alunos = await _alunos2.default.findAll( {
        attributes: ["id", "nome", "turma", "idade", "media"],
        order: [["id", "DESC"], [_files2.default, "id", "DESC"]],
        include: { 
          model: _files2.default,
          attributes: ["filename", "url" ,"id"],
        },
      });
      res.json(alunos);
    } catch (error) {
      console.error("Erro ao listar alunos:", error);
      return res.status(400).json({errors: error.errors ? error.errors.map((err) => err.message) : [error.message]});
    }
  }

  async show (req, res) {
    try {
      if(!req.params.id) {
        return res.status(400).json({errors:['ID inválido']});
      }
      const aluno = await _alunos2.default.findByPk(req.params.id, {
        attributes: ["id", "nome", "turma", "idade", "media"],
        order: [["id", "DESC"], [_files2.default, "id", "DESC"]],
        include: { 
          model: _files2.default,
          attributes: ["filename", "id", "url"],
        },
      });
      res.json(aluno);

    } catch (error) {
      console.error("Erro ao buscar aluno:", error);
      return res.status(400).json({errors: error.errors.map((err) => err.messege)});
    }
  }

  async store (req, res) {
    try {
      const newAluno = await _alunos2.default.create(req.body);
      return res.json(newAluno);

    } catch (error) {
      console.error("Erro ao salvar aluno:", error);
      return res.status(400).json({errors: error.errors.map((err) => err.messege)});
    }
  }

  async update (req, res) {
    try {
      if(!req.params.id) {
        return res.status(400).json({errors:['ID inválido']});
      }
      const aluno = await _alunos2.default.findByPk(req.params.id);
      if(!aluno) {
        return res.status(400).json({errors:['Aluno não encontrado']});
      }

      const newAluno = await aluno.update(req.body);
      res.json(newAluno);

    } catch (error) {
      console.error("Erro ao buscar aluno:", error);
      return res.status(400).json({errors: error.errors.map((err) => err.messege)});
    }
  }

  async delete(req, res) {
    try {
      if(!req.params.id) {
        return res.status(400).json({errors:['ID inválido']});
      }

      const aluno =   await _alunos2.default.findByPk(req.params.id);
      if (!aluno) {
        return res.status(400).json({errors: ['Usuario não encontrado'],});
      }

      await aluno.destroy();
      return res.json(aluno);
      
    } catch (error) {
      console.error("Erro ao -Deletar- Aluno", error);
      return res.status(400).json(null);
    }
  }
}

exports. default = new AlunoController();