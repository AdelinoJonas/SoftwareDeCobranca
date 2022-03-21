const knex = require('../../conexao');
const bcrypt = require('bcrypt');
const schemaAtualizarUsuario = require('../../validacoes/schemaAtualizarUsuario');

const atualizarUsuario = async (req, res) => {
  const { nome, email, senha, cpf, telefone } = req.body;
  const { usuario } = req;

  if (!Number(cpf)) {
    return res.status(400).json({ erro: 'cpf deve conter apenas números.' });
  }

  if (cpf.length !== 11) {
    return res.status(400).json({ erro: 'cpf deve conter 11 números.' });
  }

  try {
    await schemaAtualizarUsuario.validate(req.body);

    const usuarios = await knex('usuarios');

    for (const u of usuarios) {
      if (u.id !== usuario.id) {
        if (u.email === email) {
          return res.status(400).json({ erro: 'email já cadastrado para outro usuário.' });
        }
      }
    }

    if (cpf) {
      for (const u of usuarios) {
        if (u.id !== usuario.id) {
          if (u.cpf === cpf) {
            return res.status(400).json({ erro: 'cpf já cadastrado para outro usuário.' });
          }
        }
      }
    }

    const usuarioEncontrado = await knex('usuarios').where({ id: usuario.id }).first();

    if (usuarioEncontrado.length === 0) {
      return res.status(404).json({ erro: 'usuário não encontrado.' });
    }

    if (senha) {
      const senhaCriptografada = await bcrypt.hash(senha, 10);

      const usuarioAtualizado = await knex('usuarios').update({ nome, email, senha: senhaCriptografada, telefone, cpf }).where({ id: usuario.id });

      if (usuarioAtualizado.length === 0) {
        return res.status(400).json({ erro: 'não foi possível atualizar o usuário.' });
      }
    } else {
      const usuarioAtualizado = await knex('usuarios').update({ nome, email, telefone, cpf }).where({ id: usuario.id });

      if (usuarioAtualizado.length === 0) {
        return res.status(400).json({ erro: 'não foi possível atualizar o usuário.' });
      }
    }

    return res.status(201).json({ mensagem: "Usuario atualizado com sucesso." });
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

module.exports = atualizarUsuario;