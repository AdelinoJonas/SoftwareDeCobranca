const express = require('express');
const login = require('./controladores/login');
const cadastrarUsuarios = require('./controladores/usuarios/cadastrarUsuarios');
const atualizarUsuarios = require('./controladores/usuarios/atualizarUsuarios');
const verificaLogin = require('./filtros/verificaLogin');
const cadastrarCliente = require('./controladores/clientes/cadastrarCliente');
const atualizarCliente = require('./controladores/clientes/atualizarCliente');
const detalharUsuario = require('./controladores/usuarios/datalharUsuario');
const listarClientes = require('./controladores/clientes/listarClientes');
const obterCliente = require('./controladores/clientes/obterCliente');
const cadastrarCobranca = require('./controladores/cobrancas/cadastrarCobrancas');
const atualizarCobrancas = require('./controladores/cobrancas/atualizarCobrancas');
const listarCobrancas = require('./controladores/cobrancas/listarCobrancas');
const listarCobrancasDeUmCliente = require('./controladores/cobrancas/listarCobrancasDeUmCliente');
const listarCobrancasPagas = require('./controladores/cobrancas/listarCobrancasPagas');
const listarCobrancasVencidas = require('./controladores/cobrancas/listarCobrancasVencidas');
const listarCobrancasPendentes = require('./controladores/cobrancas/listarCobrancasPendentes');
const excluirCobranca = require('./controladores/cobrancas/excluirCobranca');
const detalharCobranca = require('./controladores/cobrancas/detalharCobranca');
const obterEmailsUsuarios = require('./controladores/usuarios/obterEmailsUsuarios');

const rotas = express();

rotas.post('/usuarios', cadastrarUsuarios);
rotas.get('/usuarios/email', obterEmailsUsuarios);
rotas.post('/login', login);

rotas.use(verificaLogin);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', atualizarUsuarios);

rotas.get('/clientes', listarClientes);
rotas.get('/clientes/:id', obterCliente);
rotas.post('/clientes', cadastrarCliente);
rotas.put('/clientes/:id', atualizarCliente);

rotas.get('/cobrancas', listarCobrancas);
rotas.get('/detalharcobranca/:id', detalharCobranca);
rotas.get('/cobrancaspagas', listarCobrancasPagas);
rotas.get('/cobrancasvencidas', listarCobrancasVencidas);
rotas.get('/cobrancaspendentes', listarCobrancasPendentes);
rotas.get('/cobrancas/:cliente_id', listarCobrancasDeUmCliente);
rotas.post('/cobrancas', cadastrarCobranca);
rotas.put('/cobrancas/:id', atualizarCobrancas);
rotas.delete('/cobrancas/:id', excluirCobranca);

module.exports = rotas;