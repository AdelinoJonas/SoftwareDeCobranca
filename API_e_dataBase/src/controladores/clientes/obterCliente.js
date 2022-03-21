const knex = require("../../conexao");

const obterCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await knex('clientes').where({ id }).first();

    if (!cliente) {
      return res.status(400).json({ erro: 'usuário não encontrado.' });
    }

    const cobrancas = await knex('cobrancas').where({ cliente_id: id });

    cliente.cobrancas = cobrancas;

    return res.status(200).json(cliente);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

module.exports = obterCliente;