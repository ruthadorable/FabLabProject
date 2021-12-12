const debug = require("debug")("fablab:schema");
const connection = require("../../backend2/connection");
const { DataTypes, Model } = require("sequelize");

debug("Defining role model...");

class Invoice extends Model {}

Invoice.init(
  {
    num: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    amount_total: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
   
  },
  { sequelize: connection, modelName: "invoice" }
);

debug("Invoice model defined.");

module.exports = Invoice;