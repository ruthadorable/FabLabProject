const debug = require("debug")("fablab:schema");
const connection = require("./connection");
const { DataTypes, Model } = require("sequelize");

debug("Defining role model...");

class InvoiceDetail extends Model {}

InvoiceDetail.init(
  {
     
    equipmentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    equipment_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    equipment_tarif: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration_M: {
        type: DataTypes.STRING,
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
    facturation:{
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
   
  },
  { sequelize: connection, modelName: "invoicedetail" }
);

debug("InvoiceDetail model defined.");

module.exports = InvoiceDetail;