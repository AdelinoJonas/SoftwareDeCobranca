const yup = require('./configuracoes');

const schemaAtualizarCobrancas = yup.object().shape({
  descricao: yup.string().required(),
  vencimento: yup.date().required(),
  valor: yup.string().required(),
  status: yup.boolean().required()
});

module.exports = schemaAtualizarCobrancas;