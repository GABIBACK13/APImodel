const { DataTypes, Model } = require("sequelize");

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
