const { request, response } = require('express');

const usuariosGet = (req = request, res = response) => {
    res.json({
        msg: 'get API - controlador'
    });
}

const usuariosPut = (req = request, res =response) => {
    res.json({
        msg: 'put API'
    });
}

const usuariosPost = (req = request, res = response) => {
    
    const body = req.body;
    
    res.status(201).json({
        msg: 'post API',
        body
    });
}

const usuariosDelete = (req = request, res = response) => {
    res.json({
        msg: 'delete API'
    });
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}