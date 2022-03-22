import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import BotaoModalCobranca from "../CadastroCobranca";
import BuscaNaoEncontrada from "../BuscaNaoEncontrada";
import UserContext from "../../contexts/userContext";
import iconeCobranca from "../../assets/icones_clientes/icone-add-cobranca.svg";
import iconeOrdenarTabela from "../../assets/icones_clientes/icone-ordenar-tabelaDown.svg";
import { useHistory } from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
  head: {
    borderBottom: '1px solid #EFF0F6;',
    backgroundColor: theme.palette.common.white,
    color: '#3F3F55',
    fontSize: 16,
    fontFamily: 'Nunito',
    fontWeight: 700,
    lineHeight: '50px',
  },
  body: {
    borderBottom: '1px solid #EFF0F6;',
    color: '#747488',
    fontSize: 14,
    fontFamily: 'Nunito',
    fontWeight: 400,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({}))(TableRow);

const useStyles = makeStyles({
  tableContainer: {
    borderRadius: '30px',
    width: '81vw',
  },
  table_cobrancaIcone: {
    cursor: 'pointer',
  },
  table_ordenar: {
    position: 'relative',
  },
  table_ordenarIcone: {
    cursor: 'pointer',
    position: 'relative',
    top: '5px',
  },
});

export default function CustomizedTables() {
  const history = useHistory();
  const classes = useStyles();
  const [abrirModal, setAbrirModal] = useState(false);

  const {
    registrosSrc,
    carregarDadosCliente,
    setIdCliente,
    dadosCliente,
    setNomeCliente,
    idCobranca,
    ordenar,
    setOrdenar,
    boleanoFiltroClientesEmDia,
    boleanoFiltroClientesInad,
    setRegistrosSrc,
    homeClientesInadFiltro,
    homeClientesAdimFiltro,
  } = useContext(UserContext);

  useEffect(() => {
    abrirDetalhesCliente(localStorage.getItem('idCliente'));
  }, []);

  let registro = []

  function clienteEmDiaOuNão() {
    if (boleanoFiltroClientesEmDia && !boleanoFiltroClientesInad) {
      registro = registrosSrc.filter(x => x.status === true);
      setRegistrosSrc(registro);
    }
    if (boleanoFiltroClientesInad && !boleanoFiltroClientesEmDia) {
      registro = registrosSrc.filter(x => x.status === false);
      setRegistrosSrc(registro);
    }
  }

  useEffect(() => {
    clienteEmDiaOuNão();
  }, [boleanoFiltroClientesEmDia, boleanoFiltroClientesInad]);

  const abrirDetalhesCliente = (id) => {
    carregarDadosCliente(id);
    window.localStorage.setItem('idCliente', id);
  };

  useEffect(() => {
    abrirDetalhesCliente(localStorage.getItem('idCliente'));
  }, [idCobranca]);

  function ordenarClientesNome() {
    if (ordenar === 'crescenteCliente') {
      setOrdenar('decrescenteCliente');
      registrosSrc.sort((a, b) =>
        a.nome > b.nome ? -1 : a.nome < b.nome ? 1 : 0
      );
    } else if (ordenar === 'decrescenteCliente') {
      setOrdenar('');
      registrosSrc.sort((a, b) => a.id - b.id);
    } else {
      setOrdenar('crescenteCliente');
      registrosSrc.sort((a, b) =>
        a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0
      );
    }
  }

  function ordenarClientesEmail() {
    if (ordenar === 'crescenteCliente') {
      setOrdenar('decrescenteCliente');
      registrosSrc.sort((a, b) =>
        a.email > b.email ? -1 : a.email < b.email ? 1 : 0
      );
    } else if (ordenar === 'decrescenteCliente') {
      setOrdenar('');
      registrosSrc.sort((a, b) => a.id - b.id);
    } else {
      setOrdenar('crescenteCliente');
      registrosSrc.sort((a, b) =>
        a.email < b.email ? -1 : a.email > b.email ? 1 : 0
      );
    }
  }

  function ordenarClientesCpf() {
    if (ordenar === 'crescenteCliente') {
      setOrdenar('decrescenteCliente');
      registrosSrc.sort((a, b) => (a.cpf > b.cpf ? -1 : a.cpf < b.cpf ? 1 : 0));
    } else if (ordenar === 'decrescenteCliente') {
      setOrdenar('');
      registrosSrc.sort((a, b) => a.id - b.id);
    } else {
      setOrdenar('crescenteCliente');
      registrosSrc.sort((a, b) => (a.cpf < b.cpf ? -1 : a.cpf > b.cpf ? 1 : 0));
    }
  }

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      {registrosSrc.length === 0 ? (
        <BuscaNaoEncontrada />
      ) : (
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className={classes.table_ordenar}>
                <img
                  className={classes.table_ordenarIcone}
                  onClick={() => ordenarClientesNome()}
                  src={iconeOrdenarTabela}
                  alt="Ordenar tabela"
                />
                Cliente
              </StyledTableCell>

              <StyledTableCell className={classes.table_ordenar}>
                <img
                  className={classes.table_ordenarIcone}
                  onClick={() => ordenarClientesCpf()}
                  src={iconeOrdenarTabela}
                  alt="Ordenar tabela"
                />
                CPF
              </StyledTableCell>
              <StyledTableCell className={classes.table_ordenar}>
                <img
                  className={classes.table_ordenarIcone}
                  onClick={() => ordenarClientesEmail()}
                  src={iconeOrdenarTabela}
                  alt="Ordenar tabela"
                />
                E-Mail
              </StyledTableCell>
              <StyledTableCell>Telefone</StyledTableCell>
              <StyledTableCell style={{ textAlign: "center" }}>
                Status
              </StyledTableCell>
              <StyledTableCell style={{ textAlign: "center" }}>
                Criar Cobrança
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <BotaoModalCobranca
              open={abrirModal}
              handleClose={() => setAbrirModal(false)}
            />

            {registrosSrc &&
              registrosSrc.map((registro) => (
                <StyledTableRow key={registro.id}>
                  <StyledTableCell
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      abrirDetalhesCliente(registro.id);
                      history.push("/detalhesCliente");
                    }}
                  >
                    {registro.nome}
                  </StyledTableCell>
                  <StyledTableCell>{registro.cpf}</StyledTableCell>
                  <StyledTableCell>{registro.email}</StyledTableCell>
                  <StyledTableCell>{registro.telefone}</StyledTableCell>
                  <StyledTableCell style={{ textAlign: "center" }}>
                    <span
                      className={registro.status ? "em-dia" : "inadimplente"}
                    >
                      {registro.status ? "Em dia" : "Inadimplente"}
                    </span>
                  </StyledTableCell>
                  <StyledTableCell>
                    <div className="criar-cobranca">
                      <img
                        onClick={(props) => {
                          setAbrirModal(true);
                          setIdCliente(registro.id);
                          setNomeCliente(registro.nome);
                        }}
                        src={iconeCobranca}
                        alt="Adicionar cobrança"
                      />
                      <span>Cobrança</span>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
