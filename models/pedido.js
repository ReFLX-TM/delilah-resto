const { DataTypes } = require("sequelize");
const db = require("../database/connection");

const Pedido = db.define('Pedido', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    idUsuario: {
        type: DataTypes.INTEGER
    },
    productos: {
        type: DataTypes.STRING
    },
    direccion: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING
    }
})

module.exports = Pedido;