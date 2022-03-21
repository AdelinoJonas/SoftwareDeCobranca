const knex = require('../../conexao');

const detalharUsuario = async (req, res) => {
  const { usuario } = req;

  try {
    const usuarioDetalhado = await knex('usuarios').where({ id: usuario.id }).first();

    const { senha, ...dadosUsuario } = usuarioDetalhado;

    return res.status(200).json(dadosUsuario);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

module.exports = detalharUsuario;