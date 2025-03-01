"use strict";const { DataTypes, Model } = require("sequelize");

class Aluno extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: DataTypes.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Nome precisa ter entre 3 a 255 caracteres',
            }
          },
        },
        turma: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          defaultValue: '',
          validate: {
            isEmail: {
              msg: 'email Inválido',
            }
          },
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
  static associate(models) {
    this.hasMany(models.File, {foreignKey: 'aluno_id'});
  };
}

module.exports = Aluno;
