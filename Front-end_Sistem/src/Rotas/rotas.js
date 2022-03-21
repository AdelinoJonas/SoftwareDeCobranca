import React, { useContext } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "../components/Card/Login";
import Senha from "../components/Senha";
import Cadastro from "../components/Card/Cadastro";
import CadastroConcluido from "../components/Card/CadastroConcluido";
import Navbar from "../components/Navbar";
import AddClientes from "../components/AddClientes";
import ModalClientes from "../components/ModalClientes";
import TabelaClientes from "../components/TabelaClientes";
import DetalhesCliente from "../components/DetalhesCliente";
import Main from "../components/Main/Main.js";
import CobrancaLista from "../components/CobrancaLista";
import RotasProtegidas from "../components/RotasProtegidas";
import UserContext from "../contexts/userContext";

const Routes = () => {
  const { modal } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Route component={Login} exact path="/" />
      <Route component={Cadastro} exact path="/cadastro" />
      <Route component={Senha} exact path="/senha" />
      <Route component={CadastroConcluido} exact path="/cadastroConcluido" />
      <RotasProtegidas>
        <Route component={Main} exact path="/home" />

        <Route exact path="/clientes">
          <div className="container-clientes">
            <Route component={Navbar} exact path="/clientes" />
            <Route component={AddClientes} exact path="/clientes" />
            <Route component={TabelaClientes} exact path="/clientes" />
          </div>
        </Route>
        <Route component={DetalhesCliente} exact path={`/detalhesCliente`} />
        {modal && <Route component={ModalClientes} exact path={`/clientes`} />}
        {modal && (
          <Route component={ModalClientes} exact path={`/detalhesCliente`} />
        )}
        <Route component={CobrancaLista} exact path={`/cobrancas`} />
      </RotasProtegidas>
    </BrowserRouter>
  );
};

export default Routes;
