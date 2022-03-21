const knex = require("../../conexao");
const { isAfter } = require('date-fns');

const listarCobrancasPendentes = async (req, res) => {

  try {
    const cobrancasNaoPagas = await knex('cobrancas').where({ status: true });

    if (!cobrancasNaoPagas) {
      return res.status(400).json({ erro: 'não foi possível listar as cobranças não pagas.' });
    }

    const cobrancasPendentes = cobrancasNaoPagas.filter((cobranca) => {
      return isAfter(cobranca.vencimento, new Date());
    })

    if (!cobrancasPendentes) {
      return res.status(400).json({ erro: 'não foi possível listar as cobranças vencidas.' });
    }

    return res.status(200).json(cobrancasPendentes);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

module.exports = listarCobrancasPendentes;