const { request, response } = require('express');
const Pedido = require('../models/pedido');

const pedidosGet = async (req = request, res = response) => {
    const { limit = 5, offset = 0 } = req.query;

    return res.send(await Pedido.findAll({
        attributes: ['id', 'idUsuario'],
        limit: Number(limit),
        offset: Number(offset)
    }))
}

const estadoPedidosPut = async (req = request, res = response) => {
    const { id } = req.params
    const { estado } = req.body;

    try {
        
        // Verificar pedido por id
        const pedidoParaActualizar = await Pedido.findByPk( id )
        if ( !pedidoParaActualizar ) {
            return res.status(404).send({
                msg: 'No existe un producto con ese id'
            })
        }

        await pedidoParaActualizar.update( { estado } ); 

        return res.status(202).send( pedidoParaActualizar );

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "Hable con el admin"
        })
    }
}


const pedidosPost = async (req = request, res = response) => {
    const { body, usuario } = req;
    try {
        const { direccion, productos } = body 

        // Obtener la direccion del usuario en el caso de que no se especifique otra
        if (!direccion) {
            body.direccion = usuario.direccion
        }
        
        // Se crea el objeto del pedido
        const pedidoObj = {
            idUsuario: usuario.id,
            productos: JSON.stringify(productos),
            direccion: body.direccion,
            estado: "Activo"
        };

        // Crear la instancia del pedido nuevo
        const pedido = new Pedido(pedidoObj);

        // Guardar en BD
        const pedidoGuardado = await pedido.save();
        return res.status(201).send({
            pedidoGuardado
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "Hable con el admin"
        })
    }
}

module.exports = {
    pedidosGet,
    estadoPedidosPut,
    pedidosPost
}