const knex = require("../../conexao");
const { isAfter } = require('date-fns');

const listarCobrancasVencidas = async (req, res) => {

  try {
    const cobrancasNaoPagas = await knex('cobrancas').where({ status: true });

    if (!cobrancasNaoPagas) {
      return res.status(400).json({ erro: 'não foi possível listar as cobranças não pagas.' });
    }

    const cobrancasVencidas = cobrancasNaoPagas.filter((cobranca) => {
      return isAfter(new Date(), cobranca.vencimento);
    })

    if (!cobrancasVencidas) {
      return res.status(400).json({ erro: 'não foi possível listar as cobranças vencidas.' });
    }

    return res.status(200).json(cobrancasVencidas);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

module.exports = listarCobrancasVencidas;