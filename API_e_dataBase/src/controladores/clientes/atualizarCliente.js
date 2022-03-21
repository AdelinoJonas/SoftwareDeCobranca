const knex = require('../../conexao');
const schemaAtualizarCliente = require('../../validacoes/schemaAtualizarCliente');

const atualizarCliente = async (req, res) => {
  const {
    nome,
    email,
    cpf,
    telefone,
    cep,
    logradouro,
    complemento,
    bairro,
    cidade,
    estado,
    status
  } = req.body;

  const { id } = req.params;

  if (!cpf) {
    return res.status(400).json({ erro: 'o campo cpf é obrigatório.' });
  }

  if (!Number(cpf)) {
    return res.status(400).json({ erro: 'cpf deve conter apenas números.' });
  }

  if (cpf.length !== 11) {
    return res.status(400).json({ erro: 'cpf deve conter 11 números.' });
  }

  try {
    await schemaAtualizarCliente.validate(req.body);

    const clientes = await knex('clientes');

    const clienteEncontrado = await knex('clientes').where({
      id
    });

    for (const c of clientes) {
      if (c.id !== Number(id)) {
        if (c.email === email) {
          return res.status(400).json({
            erro: 'email já cadastrado para outro cliente.'
          });
        }
      }
    }

    for (const u of clientes) {
      if (u.id !== Number(id)) {
        if (u.cpf === cpf) {
          return res.status(400).json({
            erro: 'cpf já cadastrado para outro cliente.'
          });
        }
      }
    }

    if (clienteEncontrado.length === 0) {
      return res.status(404).json({
        erro: 'cliente não encontrado.'
      });
    }

    const clienteAtualizado = await knex('clientes').update({
      nome,
      email,
      cpf,
      telefone,
      cep,
      logradouro,
      complemento,
      bairro,
      cidade,
      estado,
      status
    }).where({
      id
    });

    if (clienteAtualizado.length === 0) {
      return res.status(400).json({
        erro: 'não foi possível atualizar o cliente.'
      });
    }

    return res.status(201).json({ mensagem: "Cliente atualizado com sucesso." });

  } catch (error) {
    res.status(400).json({
      erro: error.message
    });
  }
}

module.exports = atualizarCliente;