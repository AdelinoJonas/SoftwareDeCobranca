const knex = require('../../conexao');
const schemaCadastroCliente = require('../../validacoes/schemaCadastrarCliente');

const cadastrarCliente = async (req, res) => {
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
    await schemaCadastroCliente.validate(req.body);

    const clienteComEmail = await knex('clientes').where({
      email
    }).first();

    if (clienteComEmail) {
      return res.status(400).json({
        erro: 'o email informado já pertence a outro usuário.'
      });
    }

    const clienteComCpf = await knex('clientes').where({
      cpf
    }).first();

    if (clienteComCpf) {
      return res.status(400).json({
        erro: 'o cpf informado já pertence a outro usuário.'
      });
    }

    const clienteCadastrado = await knex('clientes').insert({
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
    });

    if (!clienteCadastrado) {
      return res.status(400).json({
        erro: 'não foi possível cadastrar o usuário.'
      });
    }

    return res.status(201).json({ mensagem: "Cliente cadastrado com sucesso." });
  } catch (error) {
    return res.status(400).json({
      erro: error.message
    });
  }
}

module.exports = cadastrarCliente;