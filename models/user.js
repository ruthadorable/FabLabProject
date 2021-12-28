const debug = require("debug")("fablab:schema");
const connection = require("./connection");
const { DataTypes, Model } = require("sequelize");

debug("Defining User model...");

class User extends Model {}

User.init(
  {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'L adresse e-mail est deja utilisé'
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
  },
  { sequelize: connection, modelName: "user" }
);

debug("User model defined.");

module.exports = User;