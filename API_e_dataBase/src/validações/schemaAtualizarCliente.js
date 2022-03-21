const yup = require('./configuracoes');

const schemaAtualizarUsuario = yup.object().shape({
  nome: yup.string().strict().required(),
  email: yup.string().email().required(),
  telefone: yup.string().required().max(15),
  cep: yup.string(),
  logradouro: yup.string(),
  complemento: yup.string(),
  bairro: yup.string().strict(),
  cidade: yup.string().strict(),
  estado: yup.string().strict(),
  status: yup.boolean().required()
})

module.exports = schemaAtualizarUsuario;
