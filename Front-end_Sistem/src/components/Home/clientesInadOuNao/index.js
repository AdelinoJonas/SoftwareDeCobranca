import "./styles.css";
import "../cobrancas_detalhadas/styles.css";
import React, { useContext } from "react";
import { Link } from 'react-router-dom'
import UserContext from "../../../contexts/userContext";
import logoClientesInad from "../../../assets/icones_home/logoClientesInad.svg";
import logoClientesEmDia from "../../../assets/icones_home/logoClientesEmDia.svg";
const { format } = require("date-fns");

function ClientesInadENao() {
  const {
    homeValorTotalClienteAdim,
    homeClientesAdimFiltroQuatro,
    homeClientesInadFiltroQuatro,
    homeValorTotalClienteInad,
    setBoleanoFiltroClientesEmDia,
    setBoleanoFiltroClientesInad,
  } = useContext(UserContext);

  function boleanoDosClientesInad() {
    setBoleanoFiltroClientesInad(true)
    setBoleanoFiltroClientesEmDia(false)
  }

  function boleanoDosClientesAdim() {
    setBoleanoFiltroClientesInad(false)
    setBoleanoFiltroClientesEmDia(true)
  }

  return (
    <div className='conteinerRowCobrancas'>
      <div className='conteiner-clientes'>
        <div className='titulo-clientes-modalGrande'>
          <img
            src={logoClientesInad}
            alt='logo dos clientes inadimplentes'
            className='titulo-clientes-conteiner-img'
          />
          <div className='tituloSoma'>
            <h1 className='titulo-cobrancas-h1'>Clientes Inadimplentes</h1>
            <h1 className='numeroTotal-cobrancasVencidas titulo-cobrancas-h1'>
              {homeValorTotalClienteInad}
            </h1>
          </div>
        </div>
        <div className='clientes-informacoes-topicos'>
          <h1 className='clientes-informacoes-topicos-h1'>Cliente</h1>
          <h1 className='clientes-informacoes-topicos-h1 topicoDate'>
            Data de venc.
          </h1>
          <h1 className='clientes-informacoes-topicos-h1'>Valor</h1>
        </div>
        <table className='clientes-informacoes-lista'>
          {homeClientesInadFiltroQuatro &&
            homeClientesInadFiltroQuatro.map(function (cobranca) {
              let numeroDesconfugurado = cobranca.valor;
              let numeroCorrigido = numeroDesconfugurado.toLocaleString(
                'pt-br',
                {
                  style: 'currency',
                  currency: 'BRL',
                }
              );
              let dataGrande = cobranca.vencimento;
              let date = new Date(dataGrande);
              let dateFormatado = format(date, 'dd/MM/yyyy');

              return (
                <tr className='clientes-informacoes-detalheStatus' key={cobranca.id}>
                  <td className='clientes-informacoes-detalheStatus-h1 name'>
                    {cobranca.nome_cliente}
                  </td>
                  <td className='clientes-informacoes-detalheStatus-h1 date'>
                    {dateFormatado}
                  </td>
                  <td className='clientes-informacoes-detalheStatus-h1'>
                    {`R$ ${numeroCorrigido / 100}`}
                  </td>
                </tr>
              );
            })}
        </table>
        <Link to="/clientes" className="clientesInad-button" onClick={() => boleanoDosClientesInad()}>Ver todos</Link>
      </div>
      <div className='conteiner-clientes'>
        <div className='titulo-clientes-modalGrande'>
          <img
            src={logoClientesEmDia}
            alt='logo dos clientes em dia'
            className='titulo-clientes-conteiner-img'
          />
          <div className='tituloSoma'>
            <h1 className='titulo-cobrancas-h1'>Clientes em Dia</h1>
            <h1 className='numeroTotal-cobrancasPagas titulo-cobrancas-h1'>
              {homeValorTotalClienteAdim}
            </h1>
          </div>
        </div>
        <div className='clientes-informacoes-topicos'>
          <h1 className='clientes-informacoes-topicos-h1'>Cliente</h1>
          <h1 className='clientes-informacoes-topicos-h1 topicoDate'>
            Data de venc.
          </h1>
          <h1 className='clientes-informacoes-topicos-h1'>Valor</h1>
        </div>
        <table className='clientes-informacoes-lista'>
          {homeClientesAdimFiltroQuatro &&
            homeClientesAdimFiltroQuatro.map(function (cobranca) {
              let numeroDesconfugurado = cobranca.valor;
              let numeroCorrigido = numeroDesconfugurado.toLocaleString(
                'pt-br',
                {
                  style: 'currency',
                  currency: 'BRL',
                }
              );
              let dataGrande = cobranca.vencimento;
              let date = new Date(dataGrande);
              let dateFormatado = format(date, 'dd/MM/yyyy');

              return (
                <tr className='clientes-informacoes-detalheStatus' key={cobranca.id}>
                  <td className='clientes-informacoes-detalheStatus-h1 name'>
                    {cobranca.nome_cliente}
                  </td>
                  <td className='clientes-informacoes-detalheStatus-h1 date'>
                    {dateFormatado}
                  </td>
                  <td className='clientes-informacoes-detalheStatus-h1'>
                    {`R$ ${numeroCorrigido / 100}`}
                  </td>
                </tr>
              );
            })}
        </table>
        <Link to="/clientes" className="clientesAdim-button" onClick={() => boleanoDosClientesAdim()}>Ver todos</Link>
      </div>
    </div>
  );
}

export default ClientesInadENao;
