"use strict";Object.defineProperty(exports, "__esModule", {value: true});class HomeController {
  async index (req, res) {
    try {
      return res.json(null);

    } catch (error) {
      console.error("Erro ao acessar a API:", error);
    }
  }
}

exports. default = new HomeController();