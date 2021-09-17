const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario');

const validarJWT = async ( req = request, res = response, next ) => {
    const token = req.header('x-token');
    
    if ( !token ){
        return res.status(401).send({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY )
        req.uid = uid;

        // Leer el usuario que corresponde al uid
        req.usuario = await Usuario.findByPk( uid );
        next();

    } catch (error) {
        console.log(error);
        res.status(401).send({
            msg: 'Token no válido'
        })        
    }

}

module.exports =  {
    validarJWT
}