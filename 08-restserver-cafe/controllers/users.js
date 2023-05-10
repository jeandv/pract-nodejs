const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const Usuario = require('../models/user');
const { emailExiste } = require('../helpers/db-validators');

const usuariosGet = async (req = request, res = response) => {

  // const { q, nombre, apiKey, page = 1, limit = 5 } = req.query

  const { limite = 5, desde = 0 } = req.query

  const usuarios = await Usuario.find()
    .skip(Number(desde))
    .limit(Number(limite));

  res.json({
    usuarios
  });

};

const usuariosPut = async (req, res = response) => {

  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  // validar contra base de datos
  if (password) {
    // encriptar password
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    usuario
  });

};

const usuariosPost = async (req, res = response) => {

  //  const errors = validationResult(req);

  //  if (!errors.isEmpty()) {
  //    return res.status(400).json(errors);
  //  }

  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // encriptar password
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);


  // guardar en DB
  await usuario.save()

  res.json({
    usuario
  });

};

const usuariosDelete = (req, res = response) => {

  res.json({
    msg: 'delete Api'
  });

};

const usuariosPatch = (req, res = response) => {

  res.json({
    msg: 'patch Api'
  });

};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch
}