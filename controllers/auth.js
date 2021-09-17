const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJWT");

const login = async ( req, res = response ) => {
    const { correo, contrasena } = req.body;

    try {

        // Verificar si el email existe 
        const usuario = await Usuario.findOne({where: {correo}})

        if ( !usuario ) return res.status(400).send({ msg: 'Usuario / Contraseña no son correctos - correo' })
        
        // Verificar la contraseña

        const contrasenaValida = bcrypt.compareSync( contrasena, usuario.contrasena )

        if ( !contrasenaValida ) return res.status(400).send({msg: 'Usuario / Contraseña no son correctos - contraseña'})

        // Generar JWT

        const token = await generarJWT( usuario.id );

        res.send({
            usuario,
            token
        });

    } catch (error) {
        return res.status(500).send({
            msg: 'Hable con el admin'
        })
    }
}

module.exports = {
    login
}
