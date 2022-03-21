const knex = require('../../conexao');

const listarClientes = async (req, res) => {

  try {
    const clientes = await knex('clientes');
    const cobrancas = await knex('cobrancas');

    clientes.map((cliente) => {
      cliente.cobrancas = [];
      cobrancas.map(cobranca => {
        if (cliente.id === cobranca.cliente_id) {
          cliente.cobrancas.push(cobranca);
        }
      })
    });


    return res.status(200).json(clientes);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

module.exports = listarClientes;