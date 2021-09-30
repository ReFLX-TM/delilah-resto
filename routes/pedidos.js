const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');
const { esAdmin } = require('../middlewares/validarRol');