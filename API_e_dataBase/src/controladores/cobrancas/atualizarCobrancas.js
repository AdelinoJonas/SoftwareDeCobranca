const knex = require("../../conexao");
const schemaAtualizarCobrancas = require("../../validacoes/schemaAtualizarCobrancas");

const atualizarCobrancas = async (req, res) => {
  const { descricao, vencimento, valor, status } = req.body;
  const { id } = req.params;

  try {
    await schemaAtualizarCobrancas.validate(req.body);

    const cobranca = await knex('cobrancas').where({ id }).first();

    if (!cobranca) {
      return res.status(400).json({ erro: 'cobrança não encontrada.' });
    }

    const cobrancaAtualizada = await knex('cobrancas')
      .update({ descricao, vencimento, valor, status }).where({ id });

    if (!cobrancaAtualizada) {
      return res.status(400).json({ erro: 'não foi possível atualizar a cobrança.' });
    }

    return res.status(200).json({ mensagem: "Cobrança atualizada com sucesso." });
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

module.exports = atualizarCobrancas;