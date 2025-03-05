class HomeController {
  async index (req, res) {
    try {
      return res.json(null);

    } catch (error) {
      console.error("Erro ao acessar a API:", error);
    }
  }
}

export default new HomeController();