import { useState, useEffect, useContext } from 'react';
import './styles.css';
import DadosCliente from './dadosCliente';
import Clientes from '../../assets/icones_navbar/icone-clientes.svg';
import logoBotaoEditarCobrancas from '../../assets/icones-cobrancas/logoBotaoEditarCobrancas.svg';
import logoBotaoExcluirCobrancas from '../../assets/icones-cobrancas/logoBotaoExcluirCobrancas.svg';
import logoLupaCobrancas from '../../assets/icones-cobrancas/logoLupaCobrancas.svg';
import logoPaginaCobrancas from '../../assets/icones-cobrancas/logoPaginaCobrancas.svg';
import logoSetasCobrancas from '../../assets/icones-cobrancas/logoSetasCobrancas.svg';
import logoPesquisaCobrancas from '../../assets/icones-cobrancas/logoPesquisaCobrancas.svg';
import '../../components/TabelaClientes';
import ClientesEditar from '../../assets/icones-cobrancas/logoBotaoEditarCobrancas.svg';
import ClientesExcluir from '../../assets/icones-cobrancas/logoBotaoExcluirCobrancas.svg';
import ModalExcluirCobranca from '../ModalExcluirCobranca';
import UserContext from '../../contexts/userContext';
import NavBar from '../Navbar';
import { format, isAfter, parseISO } from 'date-fns';
import Header from '../Header';
import BotaoCobrancaDetCliente from '../CadastroCobrancaDetCliente';
import ModalEditarCobranca from '../EditarCobranca';
import ModalEdit from '../Home/editCadastro/index.js';
import DetalheCobranca from '../DetalheCobranca';
import ModalCobrancaExcluidaComSucesso from '../SucessoExclusaoCobranca';
import ModalErroExclusaoDeCobranca from '../ErroExclusaoCobranca';

function App(props) {
  const {
    token,
    dadosCliente,
    show,
    setShow,
    open,
    setOpen,
    loadInfo,
    setLoadInfo,
    openModalConfirmacao,
    setOpenModalConfirmacao,
    setIdCliente,
    idCliente,
    setNomeCliente,
    nomeCliente,
    obterCobranca,
    openModalCobrancas,
    setOpenModalCobrancas,
    setIdCobranca,
    setOpenExclusaoCobrancas,
    openExclusaoCobrancas,
    setEditNome,
    setEditValor,
    setEditDescricao,
    setEditStatus,
    setEditVencimento,
    setEditId,
    ordenar,
    setOrdenar,
    carregarCobrancasCliente,
    boleanoFiltroClientesInad,
    modalSocessoExclusaoCobranca,
    modalErroExclusaoCobranca,
    setCobrancaDescricao,
  } = useContext(UserContext);
  const [registros, setRegistros] = useState([]);

  const [cobrancas, setCobrancas] = useState([]);

  const [openModalCob, setOpenModalCob] = useState(false);

  const [openModalEditCob, setOpenModalEditCob] = useState(false);

  const [dadosClienteGet, setDadosClienteGet] = useState(dadosCliente);

  useEffect(() => {
    carregarRegistroCliente();
  }, []);

  useEffect(() => {
    carregarCobrancasCliente();
  }, []);

  async function carregarRegistroCliente() {
    try {
      const response = await fetch(
        'https://api-projeto-final.herokuapp.com/clientes',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token ? token : window.localStorage.getItem("token")
              }`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setRegistros(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const dadosNoStorage = JSON.parse(
    localStorage.getItem('dadosClienteStorage')
  );

  function ordenarClientesCobrancasId() {
    if (ordenar === '') {
      setOrdenar('decrescenteClienteCobranca');
      dadosCliente.cobrancas.sort((a, b) => b.id - a.id);
    } else {
      setOrdenar('');
      dadosCliente.cobrancas.sort((a, b) => a.id - b.id);
    }
  }

  function ordenarClientesCobrancasData() {
    if (ordenar === 'crescenteClienteCobranca') {
      setOrdenar('decrescenteClienteCobranca');
      dadosCliente.cobrancas.sort((a, b) =>
        new Date(a.vencimento).getTime() > new Date(b.vencimento).getTime()
          ? -1
          : new Date(a.vencimento).getTime() < new Date(b.vencimento).getTime()
            ? 1
            : 0
      );
    } else if (ordenar === 'decrescenteClienteCobranca') {
      setOrdenar('');
      dadosCliente.cobrancas.sort((a, b) => a.id - b.id);
    } else {
      setOrdenar('crescenteClienteCobranca');
      dadosCliente.cobrancas.sort((a, b) =>
        new Date(a.vencimento).getTime() < new Date(b.vencimento).getTime()
          ? -1
          : new Date(a.vencimento).getTime() > new Date(b.vencimento).getTime()
            ? 1
            : 0
      );
    }
  }

  return (
    <div className="page">
      <NavBar />
      <ModalEditarCobranca
        open={openModalEditCob}
        fecharModalCob={() => {
          setOpenModalEditCob(false);
        }}
      />
      <div className="containerDados">
        <Header
          show={show}
          setShow={setShow}
          open={open}
          setOpen={setOpen}
          loadInfo={loadInfo}
          setLoadInfo={setLoadInfo}
        />
        <div className="nomeCliente">
          <img className="imgCliente" src={Clientes} alt="logo cliente" />

          <h1 className="nomeCliente-style">
            {dadosCliente.nome ? dadosCliente.nome : dadosNoStorage.nome}
          </h1>
        </div>
        <DadosCliente />
      </div>
      <div className="containerCobranca">
        <div className="conteudoCobranca">
          <div className="hearderCobrancasCliente">
            <span className="tituloCob">Cobranças do Cliente</span>
            <div className="btn-cobranca">
              <BotaoCobrancaDetCliente
                open={openModalCob}
                fecharModal={() => {
                  setOpenModalCob(false);
                }}
              />
              <button
                className="btn-addCob"
                onClick={() => {
                  setOpenModalCob(true);
                  setIdCliente(dadosCliente.id);
                  setNomeCliente(dadosCliente.nome);
                }}
              >
                + Nova Cobrança
              </button>
            </div>
          </div>
          <ul className="listaCobrancas">
            <div className="divSubtitulo">
              <li>
                <div className="tabela1">
                  <img
                    className="setaOrdenacaoCobrancas"
                    src={logoSetasCobrancas}
                    alt=""
                    onClick={() => ordenarClientesCobrancasId()}
                  />
                  <span className="subtitulo1">ID Cob.</span>
                </div>
                <div className="tabela">
                  <img
                    className="setaOrdenacaoCobrancas"
                    src={logoSetasCobrancas}
                    alt=""
                    onClick={() => ordenarClientesCobrancasData()}
                  />
                  <span className="subtitulo1">Data de venc.</span>
                </div>

                <span className="labelvalor">Valor</span>

                <span className="labelstatus">Status</span>

                <span className="labeldescricao">Descrição</span>
              </li>
            </div>
            {dadosCliente.cobrancas
              ? dadosCliente.cobrancas &&
              dadosCliente.cobrancas.map((cobranca) => (
                <div className="listaSolucao">
                  <li
                    className="listaPrincipal"
                    onClick={() => {
                      setOpenModalCobrancas(true);
                      obterCobranca(cobranca.id);
                    }}
                  >
                    <div className="listaPrincipal-div">
                      <span>{cobranca.id}</span>
                      <span className="data-venc">
                        {cobranca.vencimento &&
                          format(new Date(cobranca.vencimento), "dd/MM/yyyy")}
                      </span>
                      <hr />
                      <span>
                        {(cobranca.valor / 100).toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                      <span
                        className={
                          !cobranca.status
                            ? "Paga"
                            : cobranca.status &&
                              isAfter(
                                new Date(),
                                parseISO(cobranca.vencimento)
                              )
                              ? "Vencida"
                              : "Pendente"
                        }
                      >
                        {!cobranca.status
                          ? "Paga"
                          : cobranca.status &&
                            isAfter(new Date(), parseISO(cobranca.vencimento))
                            ? "Vencida"
                            : "Pendente"}
                      </span>
                      <span>{cobranca.descricao}</span>
                    </div>
                  </li>
                  <div className="iconesCobranca">
                    <img
                      onClick={() => {
                        setOpenModalEditCob(true);
                        setEditNome(cobranca.nome_cliente);
                        setEditId(cobranca.id);
                        setEditDescricao(cobranca.descricao);
                      }}
                      className="img01"
                      src={logoBotaoEditarCobrancas}
                      alt=""
                    />
                    <img
                      src={logoBotaoExcluirCobrancas}
                      alt=""
                      className="img02"
                      onClick={() => {
                        obterCobranca(cobranca.id);
                        setIdCobranca(cobranca.id);
                        setOpenExclusaoCobrancas(true);
                      }}
                    />
                  </div>
                </div>
              ))
              : dadosNoStorage.cobrancas &&
              dadosNoStorage.cobrancas.map((cobranca) => (
                <div className="listaMap-Solucao">
                  <li
                    className="listaMap"
                    onClick={() => {
                      setOpenModalCobrancas(true);
                      obterCobranca(cobranca.id);
                    }}
                  >
                    <div className="listaMap-div">
                      <span>{cobranca.id}</span>
                      <span>
                        {cobranca.vencimento &&
                          format(new Date(cobranca.vencimento), "dd/MM/yyyy")}
                      </span>
                      <span>
                        {(cobranca.valor / 100).toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                      <span
                        className={
                          !cobranca.status
                            ? "Paga"
                            : cobranca.status &&
                              isAfter(
                                new Date(),
                                parseISO(cobranca.vencimento)
                              )
                              ? "Vencida"
                              : "Pendente"
                        }
                      >
                        {!cobranca.status
                          ? "Paga"
                          : cobranca.status &&
                            isAfter(new Date(), parseISO(cobranca.vencimento))
                            ? "Vencida"
                            : "Pendente"}
                      </span>
                      <span>{cobranca.descricao}</span>
                    </div>
                  </li>
                  <div className="iconesCobranca">
                    <img
                      className="img01"
                      src={logoBotaoEditarCobrancas}
                      alt=""
                      onClick={() => {
                        console.log(dadosCliente);
                        setOpenModalEditCob(true);
                        setEditNome(cobranca.nome_cliente);
                        setEditId(cobranca.id);
                        setEditDescricao(cobranca.descricao);
                      }}
                    />
                    <img
                      src={logoBotaoExcluirCobrancas}
                      alt=""
                      className="img02"
                      onClick={() => {
                        obterCobranca(cobranca.id);
                        setIdCobranca(cobranca.id);
                        setOpenExclusaoCobrancas(true);
                      }}
                    />
                  </div>
                </div>
              ))}
            {/* <hr /> */}
          </ul>
        </div>
      </div>

      {open && (
        <ModalEdit
          open={open}
          setOpen={setOpen}
          loadInfo={loadInfo}
          setLoadInfo={setLoadInfo}
          openModalConfirmacao={openModalConfirmacao}
          setOpenModalConfirmacao={setOpenModalConfirmacao}
        />
      )}
      {openModalCobrancas && <DetalheCobranca />}
      {openExclusaoCobrancas && <ModalExcluirCobranca />}
      {modalSocessoExclusaoCobranca && <ModalCobrancaExcluidaComSucesso />}
      {modalErroExclusaoCobranca && <ModalErroExclusaoDeCobranca />}
    </div>
  );
}

export default App;

