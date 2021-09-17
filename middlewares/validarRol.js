const { request, response } = require("express");

const esAdmin = ( req = request, res = response, next ) => {

    if ( !req.usuario ){
        return res.status(500).send({
            msg: 'Se quiere verificar el rol sin validar el JWT'
        })
    }

    const { rol, nombre } = req.usuario;

    if ( rol !== 'admin' ){
        return res.status(401).send({msg: `${nombre} no es administrador`})
    }

    next();
}

module.exports = {
    esAdmin
}