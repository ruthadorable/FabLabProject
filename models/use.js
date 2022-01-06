const debug = require("debug")("fablab:schema");
const connection = require("./connection");
const { DataTypes, Model } = require("sequelize");

debug("Defining Use model...");

class Use extends Model {}

Use.init(
  {
    
    durating_M: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    
    amount_to_be_paid: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    facturé:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  { sequelize: connection, modelName: "use" }
);

debug("Use model defined.");

module.exports = Use;