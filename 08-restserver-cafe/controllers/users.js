const { request, response } = require('express');

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

const usuariosPost = (req, res = response) => {

  const { nombre, apellido } = req.body;

  res.json({
    msg: 'post Api',
    nombre,
    apellido
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