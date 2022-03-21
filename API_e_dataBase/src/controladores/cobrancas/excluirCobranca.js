const knex = require('../../conexao');

const excluirCobranca = async (req, res) => {
  const { id } = req.params

  try {
    const cobrancaDeletada = await knex('cobrancas').where({ id }).del();

    if (!cobrancaDeletada) {
      return res.status(400).json({ erro: 'Não foi possível excluir a cobrança.' });
    }

    return res.status(200).json({ mensegem: "Cobrança excluída com sucesso." });
  } catch (error) {
    return res.status(400).json({ erro: error.message })
  }
}

module.exports = excluirCobranca;