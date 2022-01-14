const Equipment = require("./equipment");
const Invoice = require("./invoice");
const Use = require("./use");
const User = require("./user");
const Role = require("./role");
/*const { hasMany } = require("./equipment");
const { BelongsTo } = require("sequelize/dist");*/

Equipment.hasMany(Use);
Use.belongsTo(Equipment);

User.hasMany(Use);
Use.belongsTo(User);

User.hasMany(Invoice);
Invoice.belongsTo(User);

Invoice.hasMany(Use)
Use.belongsTo(Invoice);

Equipment.hasMany(Invoice);
Invoice.belongsTo(Equipment);


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
};