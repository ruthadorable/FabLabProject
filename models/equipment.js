const debug = require("debug")("fablab:schema");
const connection = require("./connection");
const { DataTypes, Model } = require("sequelize");

debug("Defining equipment model...");

class Equipment extends Model {}

Equipment.init(
  {
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    image:{
      type: DataTypes.STRING(50),
      allowNull: true
    },
    price_minute: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    description:{
      type: DataTypes.STRING,
      allowNull: true

    },
           
  },
  { sequelize: connection, modelName: "equipment" }
);

debug("Equipment model defined.");

module.exports = Equipment;