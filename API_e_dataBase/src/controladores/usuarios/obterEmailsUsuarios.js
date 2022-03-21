const knex = require('../../conexao');

const obterEmailsUsuarios = async (req, res) => {

  try {
    const usuarios = await knex('usuarios');

    const emails = [];
    usuarios.map(usuario => emails.push(usuario.email));

    return res.status(200).json(emails);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

module.exports = obterEmailsUsuarios;