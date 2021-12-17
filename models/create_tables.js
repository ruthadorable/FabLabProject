require('dotenv').config();

// Load all defined models
require("./schema");

const sequelize = require("./connection");
const debug = require("debug")("monprojetdemo:schema");

(async () => {
  debug("Synchronizing database...");
  await sequelize.sync({ force: true });
  debug("Database synchronized.");

  await sequelize.close();
})();
