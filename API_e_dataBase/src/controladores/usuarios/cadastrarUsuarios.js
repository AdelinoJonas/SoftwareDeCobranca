const knex = require('../../conexao');
const bcrypt = require('bcrypt');
const schemaCadastrarUsuario = require('../../validacoes/schemaCadastrarUsuario');

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    await schemaCadastrarUsuario.validate(req.body);

    const quantidadeUsuarios = await knex('usuarios').where({ email }).first();

    if (quantidadeUsuarios) {
      return res.status(400).json({ erro: 'o email informado já pertence a outro usuário.' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuarioCadastrado = await knex('usuarios').insert({ nome, email, senha: senhaCriptografada });

    if (!usuarioCadastrado) {
      return res.status(400).json({ erro: 'não foi possível cadastrar o usuário.' });
    }

    return res.status(201).json({ mensagem: "Usuario cadastrado com sucesso." });
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

module.exports = cadastrarUsuario;