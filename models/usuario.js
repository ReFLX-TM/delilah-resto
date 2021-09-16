const { DataTypes } = require("sequelize");
const db = require("../database/connection");

const Usuario = db.define('Usuario', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    usuario: {
        type: DataTypes.STRING
    },
    nombre: {
        type: DataTypes.STRING
    },
    correo: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    direccion: {
        type: DataTypes.STRING
    },
    contrasena: {
        type: DataTypes.STRING
    },
    rol: {
        type: DataTypes.STRING
    }
})

module.exports = Usuario;