const knex = require("../../conexao");
const schemaCadastrarCobrancas = require("../../validacoes/schemaCadastrarCobrancas");

const cadastrarCobranca = async (req, res) => {
  const { nome_cliente, descricao, vencimento, valor, status, cliente_id } = req.body;

  try {
    await schemaCadastrarCobrancas.validate(req.body);

    const cobrancaCadastrada = await knex('cobrancas')
      .insert({ nome_cliente, descricao, vencimento, valor, status, cliente_id });

    if (!cobrancaCadastrada) {
      return res.status(400).json({ erro: 'não foi possível cadastrar a cobrança.' });
    }

    return res.status(201).json({ mensagem: "Cobrança cadastrada com sucesso." });
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

module.exports = cadastrarCobranca;