"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }const { DataTypes, Model } = require("sequelize");
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "Campo nome deve ter entre 3 e 255 caracteres",
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "",
          unique: {
            msg: "Email já cadastrado",
          },
          validate: {
            isEmail: {
              msg: "Email inválido",
            },
          },
        },
        password_hash: {
          type: DataTypes.STRING,
          defaultValue: "",
          allowNull: false,
        },
        password: {
          type: DataTypes.VIRTUAL,
          allowNull: false,
          defaultValue: "",
          validate: {
            len: {
              args: [7, 50],
              msg: "Campo senha deve ter entre 7 e 50 caracteres",
            },
            isAlphanumeric: {
              msg: "Campo senha deve conter apenas letras e números",
            },
          },
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true,
      }
    );
    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
      }
    });
  }
  passwordValidate(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }
}

module.exports = User;
