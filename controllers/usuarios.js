const { request, response } = require('express');
const usuarios = require('../database/data')
const bcrypt = require('bcryptjs');

const usuariosGet = (req = request, res = response) => {
    res.json({
        msg: 'get API - controlador'
    });
}

const usuariosPut = (req = request, res = response) => {
    res.json({
        msg: 'put API - controlador'
    });
}

const usuariosPost = (req = request, res = response) => {

    const { name, email, cel, address, password, admin } = req.body;
    
    // Verificar si el correo existe

    // Encriptar la contraseña

    const salt = bcrypt.genSaltSync();

    pass = bcrypt.hashSync( password, salt )

    // Guardar en BD

    usuarios.push({
        nombre: name,
        correo: email,
        telefono: cel,
        direccion: address,
        contrasena: pass,
        rol: admin
    })
    res.status(201).json({
        msg: 'usuario registrado',
        usuarios
    });
}

const usuariosDelete = (req = request, res = response) => {
    res.json({
        msg: 'delete API - controlador'
    });
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}