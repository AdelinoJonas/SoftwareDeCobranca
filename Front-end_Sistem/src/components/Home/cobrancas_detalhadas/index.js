import "./styles.css";
import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import UserContext from "../../../contexts/userContext";

function CobrancasDetalhadas() {
  const {
    homeCobrancaPrevistaQuantidade,
    homeCobrancaVencidaQuantidade,
    homeCobrancaPagaQuantidade,
    homeCobrancaVencidaQuatro,
    homeCobrancaPrevistaQuatro,
    homeCobrancaPagaQuatro,
    homeClientesAdimFiltro,
    setHomeClientesAdimFiltro,
    setHomeClientesAdimFiltroQuatro,
    setHomeValorTotalClienteAdim,
    setHomeValorCobrancaPagaTotal,
    setHomeCobrancaPagaQuatro,
    setHomeCobrancaPagaQuantidade,
    setHomeClientesInadFiltro,
    setHomeClientesInadFiltroQuatro,
    setHomeValorTotalClienteInad,
    setHomeValorCobrancaVencidaTotal,
    setHomeCobrancaVencidaQuatro,
    setHomeCobrancaVencidaQuantidade,
    setHomeValorCobrancaPrevistaTotal,
    setHomeCobrancaPrevistaQuatro,
    setHomeCobrancaPrevistaQuantidade,
    setBoleanoFiltroCobrancaVenc,
    setBoleanoFiltroCobrancaPaga,
    setBoleanoFiltroCobrancaPrev,
    setHomeCobrancaPrevistaFiltrada,
    setClienteClientesInadFiltro,
    setClienteClientesAdimFiltro,
    cobrancas,
    token,
  } = useContext(UserContext);

  function pegaOsDadosDosClientesAdim(dados) {
    let reduced = [];
    dados &&
      dados.forEach((item) => {
        let duplicated =
          reduced.findIndex((redItem) => {
            return item.nome_cliente === redItem.nome_cliente;
          }) > -1;

        if (!duplicated) {
          reduced.push(item);
        }
      });
    setHomeClientesAdimFiltro(dados);
    setClienteClientesAdimFiltro(reduced);
    setHomeClientesAdimFiltroQuatro(reduced.slice(0, 4));
    setHomeValorTotalClienteAdim(reduced.length);
    let soma = 0;
    let numeroPego = "";
    let valorPego = "";
    let textoNumero = "";
    if (dados.length !== 0) {
      for (let i = 0; i < dados.length; i++) {
        numeroPego = dados[i].valor;
        valorPego = Number(numeroPego) / 100;
        soma += valorPego;
        textoNumero = soma.toFixed(2).toString().replace(".", ",");
        Number(textoNumero);
        setHomeValorCobrancaPagaTotal(textoNumero);
      }
      setHomeCobrancaPagaQuatro(dados.slice(0, 4));
    }
    if (dados.length === 0) {
      setHomeValorCobrancaPagaTotal("0,0");
    }
    let numeroTotalCobrancasPagasHome = dados.length;
    setHomeCobrancaPagaQuantidade(numeroTotalCobrancasPagasHome);
  }

  const verificaDadosStorage = JSON.parse(localStorage.getItem("homeCobrancaPagaTotalStorage"));

  if (!verificaDadosStorage) {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  useEffect(() => {
    pegaOsDadosDosClientesAdim(JSON.parse(localStorage.getItem("homeCobrancaPagaTotalStorage")));
  }, [/*token /* cobrancas dadosStorage, dadosStorageArray */]);

  function pegaOsDadosDosClientesInad(dados) {
    let reduced = [];
    dados &&
      dados.forEach((item) => {
        let duplicated =
          reduced.findIndex((redItem) => {
            return item.nome_cliente === redItem.nome_cliente;
          }) > -1;

        if (!duplicated) {
          reduced.push(item);
        }
      });
    setHomeClientesInadFiltro(dados);
    setClienteClientesInadFiltro(reduced);
    setHomeClientesInadFiltroQuatro(reduced.slice(0, 4));
    setHomeValorTotalClienteInad(dados.length);

    let soma = 0;
    let numeroPego = "";
    let valorPego = "";
    let textoNumero = "";
    if (dados.length !== 0) {
      for (let i = 0; i < dados.length; i++) {
        numeroPego = dados[i].valor;
        valorPego = Number(numeroPego) / 100;
        soma += valorPego;
        textoNumero = soma.toFixed(2).toString().replace(".", ",");
        Number(textoNumero);
        setHomeValorCobrancaVencidaTotal(textoNumero);
      }
      setHomeCobrancaVencidaQuatro(dados.slice(0, 4));
    }
    if (dados.length === 0) {
      setHomeValorCobrancaVencidaTotal("0,0");
    }
    let numeroTotalCobrancasVencidasHome = dados.length;
    setHomeCobrancaVencidaQuantidade(numeroTotalCobrancasVencidasHome);
  }

  useEffect(() => {
    pegaOsDadosDosClientesInad(JSON.parse(localStorage.getItem("homeCobrancaVencidaTotalStorage")));
  }, [/*token /*cobrancas, dadosStorage2, dadosStorageArray2 */]);

  function pegaOsDadosDosClientesPrev(dados) {
    let reduced = [];
    dados &&
      dados.forEach((item) => {
        let duplicated =
          reduced.findIndex((redItem) => {
            return item.nome_cliente === redItem.nome_cliente;
          }) > -1;

        if (!duplicated) {
          reduced.push(item);
        }
      });
    setHomeCobrancaPrevistaFiltrada(dados);
    let soma = 0;
    let numeroPego = "";
    let valorPego = "";
    let textoNumero = "";
    if (dados.length !== 0) {
      for (let i = 0; i < dados.length; i++) {
        numeroPego = dados[i].valor;
        valorPego = Number(numeroPego) / 100;
        soma += valorPego;
        textoNumero = soma.toFixed(2).toString().replace(".", ",");
        Number(textoNumero);
        setHomeValorCobrancaPrevistaTotal(textoNumero);
      }
      setHomeCobrancaPrevistaQuatro(dados.slice(0, 4));
    }
    if (dados.length === 0) {
      setHomeValorCobrancaPrevistaTotal("0,0");
    }
    let numeroTotalCobrancasPrevistasHome = dados.length;
    setHomeCobrancaPrevistaQuantidade(numeroTotalCobrancasPrevistasHome);
  }

  useEffect(() => {
    pegaOsDadosDosClientesPrev(JSON.parse(localStorage.getItem(
      "homeCobrancaPrevistaTotalStorage"
    )));
  }, [/*token /*cobrancas /* dadosStorage3, dadosStorageArray3 */]);

  return (
    <div className="conteiner-cobrancasDetalhadas">
      <div className="conteiner-cobrancas">
        <div className="spaceBetween">
          <div className="titulo-cardDoMeio">
            <h1 className="titulo-cobrancas-nome-h1">Cobranças Previstas</h1>
            <h1 className="numeroTotal-cobrancasPrevistas titulo-cobrancas-h1">
              {homeCobrancaPrevistaQuantidade}
            </h1>
          </div>
          <div className="clientes-detalhado-topicos">
            <h1 className="clientes-detalhado-topicos-h1">Cliente</h1>
            <h1 className="clientes-detalhado-topicos-h1">ID da cob.</h1>
            <h1 className="clientes-detalhado-topicos-h1">Valor</h1>
          </div>
          <table className="tableDetalhes">
            {homeCobrancaPrevistaQuatro &&
              homeCobrancaPrevistaQuatro.map(function (cobrancas) {
                return (
                  <tr className="clientes-informacoes-detalhe" key={cobrancas.id}>
                    <td className="clientes-informacoes-detalhe-h1 primeiraColuna">
                      {cobrancas.nome_cliente}
                    </td>
                    <td className="clientes-informacoes-detalhe-h1">
                      {cobrancas.id}
                    </td>
                    <td className="clientes-informacoes-detalhe-h1">
                      {`R$ ${cobrancas.valor / 100}`}
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
        <Link to="/cobrancas" className="buttonCobrancasDetalhadas" onClick={() => setBoleanoFiltroCobrancaPrev(true)}>Ver todos</Link>
      </div>
      <div className="conteiner-cobrancas">
        <div className="spaceBetween">
          <div className="titulo-cardDoMeio">
            <h1 className="titulo-cobrancas-nome-h1">Cobranças Vencidas</h1>
            <h1 className="numeroTotal-cobrancasVencidas titulo-cobrancas-h1">
              {homeCobrancaVencidaQuantidade}
            </h1>
          </div>
          <div className="clientes-detalhado-topicos">
            <h1 className="clientes-detalhado-topicos-h1">Cliente</h1>
            <h1 className="clientes-detalhado-topicos-h1">ID da cob.</h1>
            <h1 className="clientes-detalhado-topicos-h1">Valor</h1>
          </div>
          <table className="tableDetalhes">
            {homeCobrancaVencidaQuatro &&
              homeCobrancaVencidaQuatro.map(function (cobrancas) {
                return (
                  <tr className="clientes-informacoes-detalhe" key={cobrancas.id}>
                    <td className="clientes-informacoes-detalhe-h1 primeiraColuna">
                      {cobrancas.nome_cliente}
                    </td>
                    <td className="clientes-informacoes-detalhe-h1">
                      {cobrancas.id}
                    </td>
                    <td className="clientes-informacoes-detalhe-h1">
                      {`R$ ${cobrancas.valor / 100}`}
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
        <Link to="/cobrancas" className="buttonCobrancasDetalhadas" onClick={() => setBoleanoFiltroCobrancaVenc(true)}>Ver todos</Link>
      </div>
      <div className="conteiner-cobrancas">
        <div className="spaceBetween">
          <div className="titulo-cardDoMeio">
            <h1 className="titulo-cobrancas-nome-h1">Cobranças Pagas</h1>
            <h1 className="numeroTotal-cobrancasPagas titulo-cobrancas-h1">
              {homeCobrancaPagaQuantidade}
            </h1>
          </div>
          <div className="clientes-detalhado-topicos">
            <h1 className="clientes-detalhado-topicos-h1">Cliente</h1>
            <h1 className="clientes-detalhado-topicos-h1">ID da cob.</h1>
            <h1 className="clientes-detalhado-topicos-h1">Valor</h1>
          </div>
          <table className="tableDetalhes">
            {homeCobrancaPagaQuatro &&
              homeCobrancaPagaQuatro.map(function (cobrancas) {
                return (
                  <tr className="clientes-informacoes-detalhe" key={cobrancas.id}>
                    <td className="clientes-informacoes-detalhe-h1 primeiraColuna">
                      {cobrancas.nome_cliente}
                    </td>
                    <td className="clientes-informacoes-detalhe-h1">
                      {cobrancas.id}
                    </td>
                    <td className="clientes-informacoes-detalhe-h1">
                      {`R$ ${cobrancas.valor / 100}`}
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
        <Link to="/cobrancas" className="buttonCobrancasDetalhadas" onClick={() => setBoleanoFiltroCobrancaPaga(true)}>Ver todos</Link>
      </div>
    </div>
  );
}

export default CobrancasDetalhadas;
