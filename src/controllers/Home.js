class HomeController {
  async index (req, res) {
    try {
      return res.json(null);

    } catch (error) {
      console.error("Erro ao criar aluno:", error);
    }
  }
}

export default new HomeController();