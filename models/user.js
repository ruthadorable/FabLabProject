const debug = require("debug")("fablab:schema");
const connection = require("./connection");
const { DataTypes, Model } = require("sequelize");

debug("Defining User model...");

class User extends Model {}

User.init(
  {
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    uses_id: {
      type : DataTypes.INTEGER,
      allowNull:true
    }

  },
  { sequelize: connection, modelName: "user" }
);

debug("User model defined.");

module.exports = User;