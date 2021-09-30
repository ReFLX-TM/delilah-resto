const { DataTypes } = require("sequelize");
const db = require("../database/connection");
const Usuario = require("./usuario");

const Producto = db.define('Producto', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    precio: {
        type: DataTypes.INTEGER
    },
    img: {
        type: DataTypes.STRING
    }
})

module.exports = Producto;