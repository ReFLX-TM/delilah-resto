const { request, response } = require('express');
const Producto = require('../models/producto');

const productosGet = async (req = request, res = response) => {
    const { limit = 5, offset = 0 } = req.query;

    return res.send(await Producto.findAll({
        attributes: ['id', 'nombre', 'precio', 'img'],
        limit: Number(limit),
        offset: Number(offset)
    }))
}

const productoPorIdGet = async (req = request, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findByPk( id, {
        attributes: ['id', 'nombre', 'precio', 'img']
    } )

    if ( producto ){
        return res.status(200).send(producto)
    } else {
        return res.status(404).send({
            msg: 'No existe un producto con ese id'
        })
    }
}

const productosPut = async (req = request, res = response) => {
    const { id } = req.params
    const { body } = req;

    try {
        
        // Verificar producto por id
        const productoParaActualizar = await Producto.findByPk( id )
        if ( !productoParaActualizar ) {
            return res.status(404).send({
                msg: 'No existe un producto con ese id'
            })
        }

        await productoParaActualizar.update( body ); 

        return res.status(202).send( productoParaActualizar );

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "Hable con el admin"
        })
    }
}

const productosPost = async (req = request, res = response) => {
    const { body } = req;

    try {
        // Verificar si el producto existe
        const existeProducto = await Producto.findOne({
            where: {
                nombre: body.nombre
            }
        })

        if ( existeProducto ){
            return res.status(400).send({
                msg: 'Producto ya existente'
            })
        }

        // Crear la instancia del producto nuevo
        const producto = new Producto(body);

        // Guardar en BD
        await producto.save();
        return res.status(201).send({
            msg: 'Producto creado con exito'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "Hable con el admin"
        })
    }
}

const productosDelete = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        // Verificar producto por id
        const productoParaEliminar = await Producto.findByPk( id )
        if ( !productoParaEliminar ) {
            return res.status(404).send({
                msg: 'No existe un producto con ese id'
            })
        }

        await productoParaEliminar.destroy();

        return res.status(203).json( {productoParaEliminar} );

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "Hable con el admin"
        })
    }
}


module.exports = {
    productosGet,
    productoPorIdGet,
    productosPut,
    productosPost,
    productosDelete
}