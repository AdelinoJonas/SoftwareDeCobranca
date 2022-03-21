const knex = require("../../conexao");

const listarCobrancasDeUmCliente = async (req, res) => {
  const { cliente_id } = req.params;

  try {
    const cobrancas = await knex('cobrancas').where({ cliente_id });

    if (!cobrancas) {
      return res.status(400).json({ erro: 'não foi possivel obter as cobranças.' });
    }

    if (cobrancas.length === 0) {
      return res.status(200).json({ mensagem: 'nenhuma cobrança para esse cliente.' });
    }

    return res.status(200).json(cobrancas);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

module.exports = listarCobrancasDeUmCliente;