const Equipment = require("../backend2/models/equipment");
const Invoice = require("../backend2/models/invoice");
const Use = require("../backend2/models/use");
const User = require("../backend2/models/user");
const Role = require("../backend2/models/role");

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