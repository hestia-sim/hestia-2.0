const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log("--> HOST DO BANCO:", process.env.DB_HOST);
console.log("--> USER DO BANCO:", process.env.DB_USER);

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
