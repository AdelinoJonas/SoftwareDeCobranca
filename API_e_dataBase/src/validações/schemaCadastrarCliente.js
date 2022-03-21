const yup = require('./configuracoes');

const schemaCadastroCliente = yup.object().shape({
  telefone: yup.string().required(),
  email: yup.string().email().required(),
  nome: yup.string().strict().required(),
  cep: yup.string(),
  logradouro: yup.string(),
  complemento: yup.string(),
  bairro: yup.string(),
  cidade: yup.string(),
  estado: yup.string(),
  status: yup.boolean().strict().required()
})

module.exports = schemaCadastroCliente;