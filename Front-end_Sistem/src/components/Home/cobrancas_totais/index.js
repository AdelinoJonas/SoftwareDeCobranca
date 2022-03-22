import "./styles.css";
import {useContext } from 'react';
import UserContext from '../../../contexts/userContext';
import logoCobrancasPagas from "../../../assets/icones_home/logoCobrancasPagas.svg";
import logoCobrancasVencidas from "../../../assets/icones_home/logoCobrancasVencidas.svg";
import logoCobrancasPrevistas from "../../../assets/icones_home/logoCobrancasPrevistas.svg";

function CobrancasTotais() {
  const {
    homeValorCobrancaPagaTotal, 
    homeValorCobrancaVencidaTotal, 
    homeValorCobrancaPrevistaTotal, 
  } = useContext(UserContext);


  return (
    <div className= "conteiner-total">
      <div className="cobrancas-previstas">
        <img
          className="cobrancas-img"
          src={logoCobrancasPrevistas}
          alt="icon-cobranca-previstas"
        ></img>
        <div className="conteiner-info">
          <h1 className="titulo-cobrancas">Cobranças Previstas</h1>
          <h1 className="valor-cobrancas">R$ {homeValorCobrancaPrevistaTotal}</h1>
        </div>
      </div>
      <div className="cobrancas-vencidas">
        <img
          className="cobrancas-img"
          src={logoCobrancasVencidas}
          alt="icon-cobranca-vencidas"
        ></img>
        <div className="conteiner-info">
          <h1 className="titulo-cobrancas">Cobranças Vencidas</h1>
          <h1 className="valor-cobrancas">R$ {homeValorCobrancaVencidaTotal}</h1>
        </div>
      </div>
      <div className="cobrancas-pagas">
        <img
          className="cobrancas-img"
          src={logoCobrancasPagas}
          alt="icon-cobranca-pagas"
        ></img>
        <div className="conteiner-info">
          <h1 className="titulo-cobrancas">Cobranças Pagas</h1>
          <h1 className="valor-cobrancas">R$ {homeValorCobrancaPagaTotal}</h1>
        </div>
      </div>
    </div>
  );
}

export default CobrancasTotais;
