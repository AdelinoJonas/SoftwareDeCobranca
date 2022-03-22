import "./styles.css";
import setaBaixo from "../../assets/icones_home/setaBaixo.svg";
import logoBotaoEditar from "../../assets/icones_home/logoBotaoEditar.svg";
import logoBotaoSair from "../../assets/icones_home/logoBotaoSair.svg";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/userContext";
import { NavLink as BrowserLink } from "react-router-dom";

const nomeDoCliente = {
  nome: "",
};

function Header() {
  const { show, setShow, setOpen, loadInfo, setToken, handleLoadInfo } = useContext(UserContext);

  const [form2, setForm2] = useState(nomeDoCliente);
  const [letra, setLetra] = useState(nomeDoCliente);

  function RemoverToken() {
    window.localStorage.removeItem("token");
    setToken(null);
  }

  //let tituloDoHeader = 'a'
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function funcaoTituloDoHeader() {
    if (window.location.pathname === '/cobrancas') {
      return "Cobranças"
    }
    if (window.location.pathname === '/home') {
      return "Resumo das cobranças"
    }
    if (window.location.pathname === '/clientes') {
      return "Clientes"
    }
    if (window.location.pathname === '/detalhesCliente') {
      return "Clientes > Detalhes do Cliente"
    }
  }

  function funcaoClasseTituloDoHeader() {
    if (window.location.pathname === '/home') {
      return "header-conteiner-header-h1-home"
    }
    return "header-conteiner-header-h1"
  }

  useEffect(() => {
    function getName() {
      setForm2({
        nome: loadInfo.nome,
      });
      setLetra({
        nome: loadInfo.nome,
      });
    }
    getName();
    funcaoTituloDoHeader();
    funcaoClasseTituloDoHeader()
  }, [/* funcaoTituloDoHeader */ loadInfo.nome]);


  function handleShow() {
    if (show) {
      return setShow(false);
    }
    return setShow(true);
  }

  function handleModalClose() {
    setShow(false);
    setOpen(true);
  }

  useEffect(() => {
    handleLoadInfo();
  }, [])

  const letraMaiuscula = letra.nome?.substring(0, 2).toUpperCase();

  return (
    <>
      <div className="header-conteiner-header">
        <h1 className="header-conteiner-header-h1-home">{funcaoTituloDoHeader()}</h1>
        <div className="header-conteiner-header-nome">
          <div className="header-conteiner-header-sigla">
            <h2 className="header-classe-letrasDoNome">{letraMaiuscula}</h2>
          </div>
          <p className="header-conteiner-header-p">{form2.nome}</p>

          <button
            className="header-button-seta"
          >
            <img
              onClick={() => (setShow(!show))}
              src={setaBaixo}
              alt="abrirEditarOuSair"
              className="header-button-seta-img"
            />
            {show && (
              <div className="header-modal-seta">
                <img
                  className="header-editar-img"
                  src={logoBotaoEditar}
                  alt="Botao Editar"
                  onClick={() => handleModalClose()}
                />
                <BrowserLink
                  className={"header-link-sair"} to="/"
                  onClick={() => handleShow()}
                >
                  <img
                    className="header-sair-img"
                    src={logoBotaoSair}
                    alt="Botão Sair"
                    onClick={() => RemoverToken()}
                  />
                </BrowserLink>
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
