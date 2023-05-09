const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const Usuario = require('../models/user');
const { emailExiste } = require('../helpers/db-validators');

const usuariosGet = (req, res = response) => {

  const { q, nombre, apiKey, page = 1, limit = 5 } = req.query

  res.json({
    msg: 'get Api',
    q,
    nombre,
    apiKey,
    page,
    limit
  });

};

const usuariosPut = (req, res = response) => {

  const { nombre, apellido } = req.params;

  res.json({
    msg: 'put Api',
    nombre,
    apellido
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