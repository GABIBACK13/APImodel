const { Sequelize } = require("sequelize");
const dbConfig = require("../config/database");

// Cria a conexão com o banco de dados
const conn = new Sequelize(dbConfig.development);

// Importa os Models
const Aluno = require("./Aluno")(conn); // Passa sequelize para o modelo

// Sincroniza os Models
conn
  .sync({ force: false }) // false para não recriar as tabelas toda vez
  .then(() => console.log("Banco de dados sincronizado!"))
  .catch((err) => console.error("Erro ao sincronizar o banco:", err));

module.exports = { conn, Aluno };
