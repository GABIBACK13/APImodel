const { Sequelize } = require("sequelize");
const dbConfig = require("../config/database");

const sequelize = new Sequelize(dbConfig.development);
const Aluno = require("./alunos");
const User = require("./user");

Aluno.init(sequelize);
User.init(sequelize);

module.exports = { sequelize, Aluno, User };
