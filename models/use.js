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
    durating_H: {
        type: DataTypes.INTEGER,
        allowNull: false,
        
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    amount_to_be_paid: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
  },
  { sequelize: connection, modelName: "use" }
);

debug("Use model defined.");

module.exports = Use;

