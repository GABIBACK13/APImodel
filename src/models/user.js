const { DataTypes, Model } = require("sequelize");
import bcryptjs from "bcryptjs";

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
          unique: true,
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
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });
  }
}

module.exports = User;
