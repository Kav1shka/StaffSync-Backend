const { Sequelize } = require('sequelize');
console.log("db 1");
const env = process.env.NODE_ENV || 'development';
console.log(env);
const config = require('./config');

const sequelize = new Sequelize(config[env]);
console.log("db 2");
module.exports = sequelize;