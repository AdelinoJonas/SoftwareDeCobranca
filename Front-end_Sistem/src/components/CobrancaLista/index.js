import "./styles.css";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/userContext";
import Header from "../Header";
import NavBar from "../Navbar";
import DetalheCobranca from "../DetalheCobranca";
import ModalExcluirCobranca from "../ModalExcluirCobranca";
import logoBotaoEditarCobrancas from "../../assets/icones-cobrancas/logoBotaoEditarCobrancas.svg";
import logoBotaoExcluirCobrancas from "../../assets/icones-cobrancas/logoBotaoExcluirCobrancas.svg";
import logoLupaCobrancas from "../../assets/icones-cobrancas/logoLupaCobrancas.svg";
import logoPaginaCobrancas from "../../assets/icones-cobrancas/logoPaginaCobrancas.svg";
import logoSetasCobrancas from "../../assets/icones-cobrancas/logoSetasCobrancas.svg";
import logoPesquisaCobrancas from "../../assets/icones-cobrancas/logoPesquisaCobrancas.svg";
import TextField from "@material-ui/core/TextField";
import useStyles from "./styles.js";
import BuscaNaoEncontrada from "../BuscaNaoEncontrada";
import ModalEdit from "../Home/editCadastro/index.js";
import ModalEditCobranca from "../EditCobrancaTab";
import ModalCobrancaExcluidaComSucesso from '../SucessoExclusaoCobranca';
import ModalErroExclusaoDeCobranca from '../ErroExclusaoCobranca';
const { format, isAfter } = require("date-fns");

export default function CobrancaLista() {
  const [cobrancas2, setCobrancas2] = useState([]);

  const [abrirModalEditCobranca, setabrirModalEditCobranca] = useState(false);

  const classes = useStyles();

  const {
    show,
    setShow,
    open,
    setOpen,
    loadInfo,
    setLoadInfo,
    openModalConfirmacao,
    setOpenModalConfirmacao,
    token,
    setOpenModalCobrancas,
    obterCobranca,
    openModalCobrancas,
    openExclusaoCobrancas,
    setOpenExclusaoCobrancas,
    setIdCobranca,
    cobrancas,
    setCobrancas,
    cobrancasSrc,
    setCobrancasSrc,
    pesquisaCobranca,
    setPesquisaCobranca,
    ordenar,
    setOrdenar,
    carregarCobrancasCliente,
    setEditNome,
    setEditValor,
    setEditDescricao,
    setEditStatus,
    editId,
    editStatus,
    setEditVencimento,
    setEditId,
    boleanoFiltroCobrancaVenc,
    boleanoFiltroCobrancaPaga,
    boleanoFiltroCobrancaPrev,
    homeClientesAdimFiltro,
    homeClientesInadFiltro,
    homeCobrancaPrevistaFiltrada,
    modalSocessoExclusaoCobranca,
    modalErroExclusaoCobranca
  } = useContext(UserContext);

  useEffect(() => {
    carregarCobrancasCliente();
  }, []);

  useEffect(() => {
    if (
      boleanoFiltroCobrancaVenc &&
      !boleanoFiltroCobrancaPaga &&
      !boleanoFiltroCobrancaPrev
    ) {
      if (!pesquisaCobranca) {
        setCobrancasSrc(homeClientesInadFiltro);
        return;
      }

      setCobrancasSrc(
        homeClientesInadFiltro.filter((cobranca) => {
          return (
            cobranca.nome_cliente
              .toLowerCase()
              .includes(pesquisaCobranca.trim().toLowerCase()) ||
            String(cobranca.id).includes(pesquisaCobranca.trim())
          );
        })
      );
      if (cobrancasSrc.length === 0) {
        console.log("array vazio");
      }
    }
    if (
      !boleanoFiltroCobrancaVenc &&
      boleanoFiltroCobrancaPaga &&
      !boleanoFiltroCobrancaPrev
    ) {
      if (!pesquisaCobranca) {
        setCobrancasSrc(homeClientesAdimFiltro);
        return;
      }

      setCobrancasSrc(
        homeClientesAdimFiltro.filter((cobranca) => {
          return (
            cobranca.nome_cliente
              .toLowerCase()
              .includes(pesquisaCobranca.trim().toLowerCase()) ||
            String(cobranca.id).includes(pesquisaCobranca.trim())
          );
        })
      );
      if (cobrancasSrc.length === 0) {
        console.log("array vazio");
      }
    }
    if (
      !boleanoFiltroCobrancaVenc &&
      !boleanoFiltroCobrancaPaga &&
      boleanoFiltroCobrancaPrev
    ) {
      if (!pesquisaCobranca) {
        setCobrancasSrc(homeCobrancaPrevistaFiltrada);
        return;
      }

      setCobrancasSrc(
        homeCobrancaPrevistaFiltrada.filter((cobranca) => {
          return (
            cobranca.nome_cliente
              .toLowerCase()
              .includes(pesquisaCobranca.trim().toLowerCase()) ||
            String(cobranca.id).includes(pesquisaCobranca.trim())
          );
        })
      );
      if (cobrancasSrc.length === 0) {
        console.log("array vazio");
      }
    }

    if (
      !boleanoFiltroCobrancaVenc &&
      !boleanoFiltroCobrancaPaga &&
      !boleanoFiltroCobrancaPrev
    ) {
      if (!pesquisaCobranca) {
        setCobrancasSrc(cobrancas);
        return;
      }

      setCobrancasSrc(
        cobrancas.filter((cobranca) => {
          return (
            cobranca.nome_cliente
              .toLowerCase()
              .includes(pesquisaCobranca.trim().toLowerCase()) ||
            String(cobranca.id).includes(pesquisaCobranca.trim())
          );
        })
      );
      if (cobrancasSrc.length === 0) {
        console.log("array vazio");
      }
    }
  }, [
    pesquisaCobranca,
    cobrancas,
    boleanoFiltroCobrancaVenc,
    boleanoFiltroCobrancaPaga,
    boleanoFiltroCobrancaPrev,
    setCobrancasSrc,
    homeClientesInadFiltro,
    cobrancasSrc.length,
    homeClientesAdimFiltro,
    homeCobrancaPrevistaFiltrada,
  ]);

  function ordenarCobrancasNome() {
    if (ordenar === "crescenteCobranca") {
      setOrdenar("decrescenteCobranca");
      cobrancasSrc.sort((a, b) =>
        a.nome_cliente > b.nome_cliente
          ? -1
          : a.nome_cliente < b.nome_cliente
            ? 1
            : 0
      );
    } else if (ordenar === "decrescenteCobranca") {
      setOrdenar("");
      cobrancasSrc.sort((a, b) => a.id - b.id);
    } else {
      setOrdenar("crescenteCobranca");
      cobrancasSrc.sort((a, b) =>
        a.nome_cliente < b.nome_cliente
          ? -1
          : a.nome_cliente > b.nome_cliente
            ? 1
            : 0
      );
    }
  }

  function ordenarCobrancasId() {
    if (ordenar === "") {
      setOrdenar("decrescenteCobranca");
      cobrancasSrc.sort((a, b) => b.id - a.id);
    } else {
      setOrdenar("");
      cobrancasSrc.sort((a, b) => a.id - b.id);
    }
  }

  return (
    <div className="App-1">
      <NavBar />
      <ModalEditCobranca
        open={abrirModalEditCobranca}
        fecharModalEditCobr={() => {
          setabrirModalEditCobranca(false);
        }}
      />
      <main>
        <Header />
        <div className="header-logo-cobranca-pesquisa">
          <div className="logo-e-cobranca">
            <div>
              <img
                className="logo-e-cobranca-img"
                src={logoPaginaCobrancas}
                alt="logo"
              />
            </div>
            <h1 className="titulo-cobranca-top">Cobranças</h1>
          </div>
          <div className="logo-e-procura-lupa">
            <div>
              <img
                className="logo-e-procura-lupa-img"
                alt="logo"
                src={logoPesquisaCobrancas}
              />
            </div>
            <div
              className={`${classes.pesquisarCobranca} conteiner-procura-lupa`}
            >
              <TextField
                className={`${classes.pesquisarCobranca_input} input-procura-lupa`}
                label="Pesquisa"
                variant="outlined"
                value={pesquisaCobranca}
                onChange={(e) => setPesquisaCobranca(e.target.value)}
              />
              <img
                className={classes.pesquisarCobranca_icon}
                src={logoLupaCobrancas}
                alt="Pesquisar"
              />
            </div>
          </div>
        </div>
        <div></div>
        {cobrancasSrc.length === 0 ? (
          <BuscaNaoEncontrada />
        ) : (
        <div className='conteiner-conteiner-detalhes-cobrancas-cobrancas'>
          <div className='conteiner-detalhes-cobrancas-cobrancas'>
            <div className='sub-conteiner-detalhes-cobrancas-cobrancas'>
              <div className='posicao-clientes-cobrancas disposicao'>
                <img
                  alt='logo'
                  src={logoSetasCobrancas}
                  className='detalhes-cobrancas-cobrancas-img'
                  onClick={() => ordenarCobrancasNome()}
                />
                <h3 className='detalhes-cobrancas-cobrancas-h3'>
                  Clientes
                </h3>
              </div>
            </div>
            <div className='sub-conteiner-detalhes-cobrancas-cobrancas'>
              <div className='posicao-id-cobrancas disposicao'>
                <img
                  alt='logo'
                  src={logoSetasCobrancas}
                  className='detalhes-cobrancas-cobrancas-img'
                  onClick={() => ordenarCobrancasId()}
                />
                <h3 className='detalhes-cobrancas-cobrancas-h3'>
                  ID Cob.
                </h3>
              </div>
            </div>
            <h3 className='detalhes-cobrancas-cobrancas-h3 posicao-valor-cobrancas'>Valor</h3>
            <h3 className='detalhes-cobrancas-cobrancas-h3 posicao-data-cobrancas'>Data de Venc.</h3>
            <h3 className='detalhes-cobrancas-cobrancas-h3 posicao-status-cobrancas disposicao'>Status</h3>
            <h3 className='detalhes-cobrancas-cobrancas-h3 posicao-descricao-cobrancas'>Descrição</h3>
          </div>
          {cobrancasSrc.map(function (cobrancas) {
              let numeroDesconfugurado = cobrancas.valor;
              let numeroCorrigido = numeroDesconfugurado.toLocaleString(
                "pt-br",
                {
                  style: "currency",
                  currency: "BRL",
                }
              );
              let dataGrande = cobrancas.vencimento;
              let date = new Date(dataGrande);
              let dateFormatado = format(date, "dd/MM/yyyy");
              let dataAtual = new Date();
              let confirmacaoData = isAfter(date, dataAtual);
              let statusPagamento = "";
              let corDeFundoIcone = "";
              if (cobrancas.status) {
                if (confirmacaoData) {
                  statusPagamento = "Pendente";
                  corDeFundoIcone = "classeAmareloCobrancas";
                }
                if (!confirmacaoData) {
                  statusPagamento = "Vencida";
                  corDeFundoIcone = "classeVermelhoCobrancas";
                }
              }
              if (!cobrancas.status) {
                statusPagamento = "Paga";
                corDeFundoIcone = "classeAzulCobrancas";
              }

              return (
                <table className="organiza-detalhe-cobranca">
                  <tr
                    className="linhaTabelaCobranca"
                    key={cobrancas.id}
                  >
                    <div className="separarColunas" 
                    onClick={() => {
                      setOpenModalCobrancas(true);
                      obterCobranca(cobrancas.id);
                    }}>
                      <td className="organiza-detalhe-cobranca-h3 posicao-clientes-cobrancas">
                        {cobrancas.nome_cliente}
                      </td>
                      <td className="organiza-detalhe-cobranca-h3 posicao-id-cobrancas">
                        {cobrancas.id}
                      </td>
                      <td className="organiza-detalhe-cobranca-h3 posicao-valor-cobrancas">
                        {`R$ ${numeroCorrigido}`}
                      </td>
                      <td className="organiza-detalhe-cobranca-h3 posicao-data-cobrancas">
                        {dateFormatado}
                      </td>
                      <td className={`${corDeFundoIcone} posicao-status-cobrancas margin-left-status`}>
                        {statusPagamento}
                      </td>
                      <td className="organiza-detalhe-cobranca-h3 posicao-descricao-cobrancas">
                        {cobrancas.descricao}
                      </td>
                    </div>
                  <div className="conteiner-logos-cobrancas">
                    <img
                    onClick={() => {
                      setabrirModalEditCobranca(true);
                      setEditNome(cobrancas.nome_cliente);
                      setEditId(cobrancas.id);
                      setEditDescricao(cobrancas.descricao);
                      setEditValor(cobrancas.valor);
                    }}
                      src={logoBotaoEditarCobrancas}
                      alt="logo editar"
                      className="conteiner-logos-cobrancas-img-1"
                    />
                    <img
                      src={logoBotaoExcluirCobrancas}
                      alt="logo excluir"
                      className="conteiner-logos-cobrancas-img-2"
                      onClick={() => {
                        obterCobranca(cobrancas.id)
                        setIdCobranca(cobrancas.id);
                        setOpenExclusaoCobrancas(true);
                      }}
                      />
                  </div>
                  </tr>
                </table>
              );
            })}
          </div>
        )}
      </main>

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
