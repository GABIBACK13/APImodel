const { Sequelize } = require("sequelize");
const dbConfig = require("../config/database");

const sequelize = new Sequelize(dbConfig.development);
const Aluno = require("./alunos");
const User = require("./user");
const File = require("./files");

Aluno.init(sequelize);
User.init(sequelize);
File.init(sequelize);
File.associate(sequelize.models);

module.exports = { sequelize, Aluno, User, File };
