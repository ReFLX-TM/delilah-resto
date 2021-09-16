const { Sequelize } = require('sequelize');

const db = new Sequelize('resto', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = db