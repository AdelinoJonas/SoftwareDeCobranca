import { useContext, useEffect, useState } from "react";
import "./styles.css";
import BuscaLupa from "../../assets/icones_busca/busca-nao-encontrada-lupa.svg";
import BuscaPerfil from "../../assets/icones_busca/busca-nao-encontrada-perfil.svg";

export default function BuscaNaoEncontrada() {
  return (
    <div className="containerNaoEncontrado">
      <img
        className="containerNaoEncontrados_perfil"
        src={BuscaPerfil}
        alt="Nenhum resultado encontrado"
      />
      <img
        className="containerNaoEncontrados_lupa"
        src={BuscaLupa}
        alt="Nenhum resultado encontrado"
      />
      <div className="containerNaoEncontrados_mensagem">
        <h3>Nenhum resultado foi encontrado!</h3>
        <h4>Verifique se escrita está correta</h4>
      </div>
    </div>
  );
}
