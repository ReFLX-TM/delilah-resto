const { Sequelize } = require('sequelize');

const db = new Sequelize('delilah_resto', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = db