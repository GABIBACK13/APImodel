"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }const { DataTypes, Model } = require("sequelize");

var _app = require('../config/app'); var _app2 = _interopRequireDefault(_app);

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
            return `${_app2.default.url}/images/${this.getDataValue('filename')}`
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
