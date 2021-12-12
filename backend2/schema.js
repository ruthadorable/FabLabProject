const Equipment = require("./equipment");
const Invoice = require("./invoice");
const Use = require("./use");
const User = require("./user");
const Role = require("./role");

 Equipment.hasMany(Use);
 Use.belongsTo(Equipment);

 User.hasMany(Use);
 Use.belongsTo(User);

Role.belongsToMany(User ,{
  through: "roles", 
  foreignKey: "roleId",
  otherKey: "userId"});
User.belongsToMany(Role,{
  through: "roles", 
  foreignKey: "userId",
  otherKey: "roleId"})



module.exports = {
    Equipment,
    Invoice,
    Use,
    User,
    Role,
};