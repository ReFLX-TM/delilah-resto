const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');
const { esAdmin } = require('../middlewares/validarRol');

const { usuariosGet, usuarioPorIdGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', [
    validarJWT
], usuariosGet );

router.get('/:id', [
    validarJWT
], usuarioPorIdGet );

router.put('/:id', [
    validarJWT
], usuariosPut );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('contrasena', 'El password debe ser de mas de 8 caracteres').isLength({ min: 8 }),
    check('correo', 'Elcorreo no es válido').isEmail(),
    check('rol', 'El rol es inválido').isIn(['admin', '']),
    validarCampos
] , usuariosPost );

router.delete('/:id', [
    validarJWT,
    esAdmin
], usuariosDelete );

module.exports = router;