import "./styles.css";
import editar from "../../../assets/icones_home/icone-editar.svg";
import React, { useContext, useEffect } from "react";
import UserContext from "../../../contexts/userContext";

export default function CustomizedTables() {
  // const classes = useStyles();

  const { dadosCliente, modal, setModal, editarModal, setEditarModal } = useContext(UserContext);

  function handleModalEditar() {
    setEditarModal(true);
    setModal(true);
  }

  const dadosNoStorage = JSON.parse(localStorage.getItem('dadosClienteStorage'));

  return (
    <div className="dadosClienteContainer">
      <div className="dadosHeader">
        <h1 className="tituloDados">Dados do Cliente</h1>
        <button className="buttonEditar" onClick={() => handleModalEditar()}>
          <img className="editar" src={editar} alt="icone editar" />
          <h2 className="editarCliente">Editar Cliente</h2>
        </button>
      </div>
      <div className="dadosCliente">
        <div className="formulario">
          <h1 className="requisicao">E-mail</h1>
          <h2 className="resposta primeiraResposta">{dadosCliente.email ? dadosCliente.email : dadosNoStorage.email}</h2>
        </div>
        <div className="formulario">
          <h1 className="requisicao">CPF</h1>
          <h2 className="resposta">{dadosCliente.cpf ? dadosCliente.cpf : dadosNoStorage.cpf}</h2>
        </div>
        <div className="formulario">
          <h1 className="requisicao">Telefone</h1>
          <h2 className="resposta">{dadosCliente.telefone ? dadosCliente.telefone : dadosNoStorage.telefone}</h2>
        </div>
      </div>
      <div className="endCliente">
        <div className="formulario">
          <h1 className="requisicao">Endereço</h1>
          <h2 className="resposta primeiraResposta">{dadosCliente.logradouro ? dadosCliente.logradouro : dadosNoStorage.logradouro}</h2>
        </div>
        <div className="formulario">
          <h1 className="requisicao">Complemento</h1>
          <h2 className="resposta">{dadosCliente.complemento ? dadosCliente.complemento : dadosNoStorage.complemento}</h2>
        </div>
        <div className="formulario">
          <h1 className="requisicao">CEP</h1>
          <h2 className="resposta">{dadosCliente.cep ? dadosCliente.cep : dadosNoStorage.cep}</h2>
        </div>
        <div className="formulario">
          <h1 className="requisicao">Bairro</h1>
          <h2 className="resposta">{dadosCliente.bairro ? dadosCliente.bairro : dadosNoStorage.bairro}</h2>
        </div>
        <div className="formulario">
          <h1 className="requisicao">Cidade</h1>
          <h2 className="resposta">{dadosCliente.cidade ? dadosCliente.cidade : dadosNoStorage.cidade}</h2>
        </div>
        <div className="formulario">
          <h1 className="requisicao">UF</h1>
          <h2 className="resposta">{dadosCliente.estado ? dadosCliente.estado : dadosNoStorage.estado}</h2>
        </div>
      </div>
    </div>
  );
}
