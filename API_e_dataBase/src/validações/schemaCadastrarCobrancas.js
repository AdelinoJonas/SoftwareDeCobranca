const yup = require('./configuracoes');

const schemaCadastrarCobrancas = yup.object().shape({
  cliente_id: yup.number().required(),
  nome_cliente: yup.string().required(),
  descricao: yup.string().required(),
  vencimento: yup.date().required(),
  valor: yup.string().required(),
  status: yup.boolean().required()
});

module.exports = schemaCadastrarCobrancas;