const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { body } = require('express-validator');
// const MysqlService = require('../services/mysql')

const usuariosGet = async (req = request, res = response) => {
    return res.send(await Usuario.findAll())
}

const usuarioPorIdGet = async (req = request, res = response) => {
    const { id } = req.params;
    const usuario = await Usuario.findByPk( id )

    if ( usuario ){
        return res.status(200).send(usuario)
    } else {
        return res.status(404).send({
            msg: 'No existe un usuario con ese id'
        })
    }
}

const usuariosPut = async (req = request, res = response) => {
    const { id } = req.params
    const { body } = req;

    try {
        
        // Verificar usuario por id
        const usuarioParaActualizar = await Usuario.findByPk( id )
        if ( !usuarioParaActualizar ) {
            return res.status(404).send({
                msg: 'No existe un usuario con ese id'
            })
        }

        await usuarioParaActualizar.update( body ); 

        return res.status(202).send( usuarioParaActualizar );

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "Hable con el admin"
        })
    }
}

const usuariosPost = async (req = request, res = response) => {
    const { body } = req;

    try {
        // Verificar si el correo existe
        const existeEmail = await Usuario.findOne({
            where: {
                correo: body.correo
            }
        })

        if ( existeEmail ){
            return res.status(400).send({
                msg: 'Usuario ya existente'
            })
        }

        // Crear la instancia del usuario nuevo
        const usuario = new Usuario(body);

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.contrasena = bcrypt.hashSync( usuario.contrasena, salt )

        // Guardar en BD
        await usuario.save();
        return res.status(201).send({
            msg: 'Usuario creado con exito'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "Hable con el admin"
        })
    }

    // const mysqlService = new MysqlService()
}

const usuariosDelete = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        // Verificar usuario por id
        const usuarioParaEliminar = await Usuario.findByPk( id )
        if ( !usuarioParaEliminar ) {
            return res.status(404).send({
                msg: 'No existe un usuario con ese id'
            })
        }

        await usuarioParaEliminar.destroy();

        return res.status(203).send( usuarioParaEliminar );

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "Hable con el admin"
        })
    }
}


module.exports = {
    usuariosGet,
    usuarioPorIdGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}