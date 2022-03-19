create database projeto_final;

DROP TABLE IF EXISTS usuarios;

create table usuarios (
  id serial primary key,
  nome text not null,
  email text unique not null,
  telefone text,
  cpf text unique,
  senha text not null
);

DROP TABLE IF EXISTS clientes;

create table clientes (
  id serial primary key,
  nome text not null,
  email text unique not null,
  cpf text unique not null,
  telefone text not null,
  cep text,
  logradouro text,
  complemento text,
  bairro text,
  cidade text,
  estado text,
  status boolean
);

DROP TABLE IF EXISTS cobrancas;

create table cobrancas (
  id serial primary key,
  nome_cliente text not null,
  descricao text not null,
  vencimento date not null,
  valor bigint not null,
  status boolean,
  cliente_id integer not null references clientes(id)
);