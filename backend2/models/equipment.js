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
    price_minute: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    model_machine: {
        type: DataTypes.STRING(50),
        allowNull: false,
        
    },
    reserved: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    out_of_order: {
      type: DataTypes.BOOLEAN,
      allowNull: false
  },
    
  },
  { sequelize: connection, modelName: "equipment" }
);

debug("Equipment model defined.");

module.exports = Equipment;