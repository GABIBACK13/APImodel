import User from '../models/user';

class UserController {
  async store (req, res) {
    try {
      const novoUser = await User.create(req.body);
      return res.json(novoUser);

    } catch (error) {
      console.error("Erro ao criar User:", error);
      return res.status(400).json({errors : error.errors.map((err) => err.message)});
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll();
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
        const user = await User.findByPk(id);
        return res.json(user);
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
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(400).json({
          errors: ['Usuario não encontrado'],
        });
      }
      const erase = await user.update(req.body);
      return res.json(erase);
      
    } catch (error) {
      console.error("Erro ao Editar-PUT- user", error);
      return res.status(400).json({errors : error.errors.map((err) => err.message)});
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }
    const user =   await User.findByPk(req.params.id);
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

export default new UserController();