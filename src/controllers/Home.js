import Aluno from '../models/alunos'

class HomeController {
  async index (req, res) {
    try {
      const novoAluno = await Aluno.create({
        nome: "pedro da Silva",
        turma: "3A",
        email: "datis@aluno.com",
        idade: 17,
        media: 7.9
      });
      console.log("aluno criado:", novoAluno.toJSON());

      return res.json(novoAluno);

    } catch (error) {
      console.error("Erro ao criar aluno:", error);
    }
  }
}

export default new HomeController();