const knex = require("../../conexao");

const listarCobrancasPagas = async (req, res) => {

  try {
    const cobrancas = await knex('cobrancas').where({ status: false });

    if (!cobrancas) {
      return res.status(400).json({ erro: 'não foi possível listar as cobranças.' });
    }

    return res.status(200).json(cobrancas);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

module.exports = listarCobrancasPagas;