const { Router } = require('express');

const { validarJWT } = require('../middlewares/validarJWT');
const { esAdmin } = require('../middlewares/validarRol');

const { productosGet, productoPorIdGet, productosPut, productosPost, productosDelete } = require('../controllers/productos');

const router = Router();

router.get('/', [
    validarJWT
], productosGet );

router.get('/:id', [
    validarJWT
], productoPorIdGet );

router.put('/:id', [
    validarJWT,
    esAdmin
], productosPut );

router.post('/', [
    validarJWT,
    esAdmin
] , productosPost );

router.delete('/:id', [
    validarJWT,
    esAdmin
], productosDelete );

module.exports = router