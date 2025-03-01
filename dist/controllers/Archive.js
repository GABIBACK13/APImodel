"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('../config/multer'); var _multer4 = _interopRequireDefault(_multer3);

var _files = require('../models/files'); var _files2 = _interopRequireDefault(_files);
var _alunos = require('../models/alunos'); var _alunos2 = _interopRequireDefault(_alunos); 


class ArchiveController {
  store (req, res) {
    try {
      const upload = _multer2.default.call(void 0, _multer4.default).single('archive'); //file

      return upload(req, res, async (error) => {
        if(error) {
          return res.status(400).json({errors: [error.code]});
        }
        const {originalname, filename} = req.file;
        const { aluno_id } = req.body;
        const aluno = await _alunos2.default.findByPk(aluno_id);
        if (!aluno) {
          return res.status(400).json({ errors: ['Aluno não encontrado'] });
        }
        const file = await _files2.default.create({aluno_id, originalname, filename});
        return res.json(file);
      });

    } catch (error) {
      console.error("Erro ao Salvar Arquivo:", error);
    }
  }
}

exports. default = new ArchiveController();