const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { crearCategoria } = require('../controllers/categorias');

const router = Router();

// obtener todas las categorias - publico
router.get('/', (req, res) => {
  res.json('get');
});

// obtener todas las categorias por ID - publico
router.get('/:id', (req, res) => {
  res.json('get - id');
});

// crear categoria - privado - cualquier persona con un token valido
router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos
], crearCategoria);

// actualizar un registro por el ID - privado, cualquier persona con un token valido
router.put('/:id', (req, res) => {
  res.json('put');
});

// borrar una categoria - admin
router.delete('/:id', (req, res) => {
  res.json('delete');
});

module.exports = router;