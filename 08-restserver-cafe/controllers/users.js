const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/user');

const usuariosGet = async (req = request, res = response) => {

  const { limite = 5, desde = 0 } = req.query

  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
  ]);

  res.json({
    total,
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