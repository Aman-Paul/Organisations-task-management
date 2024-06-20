const { Sequelize } = require('sequelize');
const DB_CONFIG = require('./db.config.json');

const ENV = process.env.NODE_ENV || "development";

const sequelize = new Sequelize(DB_CONFIG[ENV].DB_URL);

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

module.exports = sequelize;