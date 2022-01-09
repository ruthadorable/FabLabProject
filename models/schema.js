const Equipment = require("./equipment");
const Invoice = require("./invoice");
const Use = require("./use");
const User = require("./user");
const Role = require("./role");
const InvoiceDetail = require("./invoicedetail");
/*const { hasMany } = require("./equipment");
const { BelongsTo } = require("sequelize/dist");*/

 Equipment.hasMany(Use);
 Use.belongsTo(Equipment);

 User.hasMany(Use);
 Use.belongsTo(User);

/*Ajouter une relation equipement à Invoice ici */


InvoiceDetail.hasOne(Invoice);
Invoice.belongsTo(InvoiceDetail); //=>invoicedetailId in invoice

User.hasMany(InvoiceDetail)
InvoiceDetail.belongsTo(User)

Equipment.hasMany(Invoice);
Invoice.belongsTo(Equipment); //=>equipmentId dans Invoice

Use.hasOne(Invoice);
Invoice.belongsTo(Use);//=>UseId dans Invoice

 User.hasMany(Invoice);
 Invoice.belongsTo(User); //-> userId in Invoice


Role.belongsToMany(User ,{
  through: "user_roles", 
  foreignKey: "roleId",
  otherKey: "userId"});
User.belongsToMany(Role,{
  through: "user_roles", 
  foreignKey: "userId",
  otherKey: "roleId"})



module.exports = {
    Equipment,
    Invoice,
    Use,
    User,
    Role,
    InvoiceDetail
};