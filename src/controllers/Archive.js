import multer from 'multer';
import multerConfig from '../config/multer';

import File from '../models/files';

class ArchiveController {
  store (req, res) {
    try {
      const upload = multer(multerConfig).single('archive'); //file

      return upload(req, res, async (error) => {
        if(error) {
          return res.status(400).json({errors: [error.code]});
        }
        const {originalname, filename} = req.file;
        const { aluno_id } = req.body;
        const file = await File.create({aluno_id, originalname, filename});
        return res.json(file);
      });

    } catch (error) {
      console.error("Erro ao Salvar Arquivo:", error);
    }
  }
}

export default new ArchiveController();