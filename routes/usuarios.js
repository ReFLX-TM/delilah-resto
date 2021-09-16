const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validarCampos')

const { usuariosGet, usuarioPorIdGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet );

router.get('/:id', usuarioPorIdGet );

router.put('/:id', usuariosPut );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('contrasena', 'El password debe ser de mas de 8 caracteres').isLength({ min: 8 }),
    check('correo', 'Elcorreo no es válido').isEmail(),
    check('rol', 'El rol es inválido').isIn(['admin', 'usuario']),
    validarCampos
] , usuariosPost );

router.delete('/:id', usuariosDelete );

module.exports = router;