const debug = require("debug")("fablab:schema");
const connection = require("./connection");
const { DataTypes, Model } = require("sequelize");

debug("Defining role model...");

class Role extends Model {}

Role.init(
  {
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    permission: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
   
  },
  { sequelize: connection, modelName: "role" }
);

debug("Role model defined.");

module.exports = Role;

