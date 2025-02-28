import User from '../models/user';

class UserController {
  async store (req, res) {
    try {
      const novoUser = await User.create({
        nome: "pedro da Silva",
        email: "datis@User.com",
        password: "12006back",
      });
      console.log("User criado:", novoUser.toJSON());

      return res.json(novoUser);

    } catch (error) {
      console.error("Erro ao criar User:", error);
    }
  }
}

export default new UserController();