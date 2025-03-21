const { DataTypes, Model } = require("sequelize");

import appConfig from '../config/app';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: DataTypes.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'campo não pode estar vazio',
            },
          },
        },
        filename: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: 'campo não pode estar vazio',
            },
          },
        },
        url: {
          type: DataTypes.VIRTUAL,
          get() {
            return `${appConfig.url}/images/${this.getDataValue('filename')}`
          },
        },
      },
      {
        sequelize,
        modelName: "File",
        tableName: "alunos-files",
        timestamps: true,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Aluno, {foreignKey: 'aluno_id'});
  };
}

module.exports = File;
