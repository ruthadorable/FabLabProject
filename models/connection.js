const debug = require("debug")("monprojetdemo:sequelize");

debug("Loading sequelize library...");

const { Sequelize } = require("sequelize");

debug("Reading environment variables...");

const db_hostname = process.env.DB_HOSTNAME;
const db_dbname = process.env.DB_DBNAME;
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_dialect = process.env.DB_DIALECT;

debug("Connecting to database...");

const sequelize = new Sequelize(db_dbname, db_username, db_password, {
  host: db_hostname,
  dialect: db_dialect,
  logging: (msg) => debug(msg),
});

debug("Database connection established.");

module.exports = sequelize;