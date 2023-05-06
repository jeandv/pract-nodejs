const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const Role = require('../models/role');

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch
} = require('../controllers/users');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password es obligatorio y/o debe de ser mas de 6 letras').isLength({ min: 6 }).not().isEmpty(),
  check('correo', 'Correo no válido').isEmail(),
  // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('rol').custom(async (rol = '') => {

    const existeRol = await Role.findOne({ rol });

    if (!existeRol) {
      throw new Error(`El rol ${rol} no esta registrado en la DB`)
    }

  }),
  validarCampos
], usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;