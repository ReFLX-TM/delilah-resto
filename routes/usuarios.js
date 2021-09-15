const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validarCampos')

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet );

router.put('/', usuariosPut );

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de mas de 8 caracteres').isLength({ min: 8 }),
    check('email', 'Elcorreo no es válido').isEmail(),
    check('admin', 'El rol es inválido').isIn(['admin', 'usuario']),
    validarCampos
] , usuariosPost );

router.delete('/', usuariosDelete );

module.exports = router;