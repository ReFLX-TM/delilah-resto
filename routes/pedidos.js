const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');
const { esAdmin } = require('../middlewares/validarRol');

const { pedidosGet, estadoPedidosPut, pedidosPost } = require('../controllers/pedidos');

const router = Router();

router.get('/', [
    validarJWT,
    esAdmin
], pedidosGet );

router.put('/:id', [
    validarJWT,
    esAdmin
], estadoPedidosPut );

router.post('/', [
    validarJWT
] , pedidosPost );

module.exports = router;