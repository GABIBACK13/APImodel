import Aluno from '../models/alunos';

class AlunoController {
  async index (req, res) {
    try {
      const alunos = await Aluno.findAll();
      res.json(alunos);
    } catch (error) {
      console.error("Erro ao listar alunos:", error);
      return res.status(400).json({errors: error.errors.map((err) => err.messege)});
    }
  }

  async show (req, res) {
    try {
      if(!req.params.id) {
        return res.status(400).json({errors:['ID inválido']});
      }
      const aluno = await Aluno.findByPk(req.params.id);
      res.json(aluno);

    } catch (error) {
      console.error("Erro ao buscar aluno:", error);
      return res.status(400).json({errors: error.errors.map((err) => err.messege)});
    }
  }

  async store (req, res) {
    try {
      const newAluno = await Aluno.create(req.body);
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
      const aluno = await Aluno.findByPk(req.params.id);
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

      const aluno =   await Aluno.findByPk(req.params.id);
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

export default new AlunoController();