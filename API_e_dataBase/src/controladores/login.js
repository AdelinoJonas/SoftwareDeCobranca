const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('../conexao');
const schemaLogin = require("../validacoes/schemaLogin");

const login = async (req, res) => {
  const { senha, email } = req.body;

  try {
    await schemaLogin.validate(req.body);

    const usuario = await knex('usuarios').where({ email }).first();

    if (!usuario) {
      return res.status(404).json({ erro: 'email e/ou senha incorretos.' });
    }

    const senhaVerificada = await bcrypt.compare(senha, usuario.senha);

    if (!senhaVerificada) {
      return res.status(400).json({ erro: 'email e/ou senha incorretos.' });
    }

    const token = jwt.sign({ id: usuario.id }, process.env.SEGREDO_LOGIN,);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

module.exports = login;