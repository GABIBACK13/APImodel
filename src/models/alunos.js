const { DataTypes, Model } = require("sequelize");

class Aluno extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        turma: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        idade: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 12,
            max: 120,
          },
        },
        media: {
          type: DataTypes.FLOAT,
          allowNull: false,
          validate: {
            min: 0,
            max: 10,
          },
        },
      },
      {
        sequelize,
        modelName: "Aluno",
        tableName: "alunos",
        timestamps: true,
      }
    );
  }
}

module.exports = Aluno;
