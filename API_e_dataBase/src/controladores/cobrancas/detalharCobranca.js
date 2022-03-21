const knex = require('../../conexao');

const detalharCobranca = async (req, res) => {
  const { id } = req.params

  try {
    const cobranca = await knex('cobrancas').where({ id }).first();

    if (!cobranca) {
      return res.status(400).json({ erro: 'Cobrança não encontrada.' });
    }

    return res.status(200).json(cobranca);
  } catch (error) {
    return res.status(400).json({ erro: error.message })
  }
}

module.exports = detalharCobranca;