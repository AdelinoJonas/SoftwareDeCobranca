import CssBaseline from "@material-ui/core/CssBaseline";
import { useContext, useState } from 'react';
import Drawer from "@material-ui/core/Drawer";
import React from "react";
import Clientes from "../../assets/icones_navbar/icone-clientes.svg";
import Cobrancas from "../../assets/icones_navbar/icone-cobrancas.svg";
import Home from "../../assets/icones_navbar/icone-home.svg";
import ClientesSelect from "../../assets/icones_navbar/icone-clientes-selecionado.svg";
import CobrancasSelect from "../../assets/icones_navbar/icone-cobrancas-selecionado.svg";
import HomeSelect from "../../assets/icones_navbar/icone-home-selecionado.svg";
import useStyles from "./styles.js";
import { NavLink as BrowserLink } from "react-router-dom";
import "./styles.css";
import UserContext from "../../contexts/userContext";

export default function Navbar() {
  const classes = useStyles();
  // const path = window.location.pathname;

  const { carregarRegistros, carregarCobrancasCliente } = useContext(UserContext);

  const [menuSelecionado, setMenuSelecionado] = useState('Home');

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.navbarContainer}>
          <BrowserLink
            className={classes.navbarItem}
            to="/home"
          >
            {" "}
            <img
              className={classes.navbarIcon}
              src={window.location.pathname === '/home' ? HomeSelect : Home}
              alt="Home"
              onClick={() => setMenuSelecionado('Home')}
            />
            <span className="tirarLinha">Home</span>
          </BrowserLink>
          <BrowserLink
            className={classes.navbarItem}
            to="/clientes"
          >
            {" "}
            <img
              className={classes.navbarIcon}
              src={window.location.pathname === '/clientes' || window.location.pathname === '/detalhesCliente' ? ClientesSelect : Clientes}
              alt="Clientes"
              onClick={() => {
                carregarRegistros();
                setMenuSelecionado('Clientes')
              }
              }
            />
            <span>Clientes</span>
          </BrowserLink>
          <BrowserLink
            className={classes.navbarItem}
            to="/cobrancas"
          >
            {" "}
            <img
              className={classes.navbarIcon}
              src={window.location.pathname === '/cobrancas' ? CobrancasSelect : Cobrancas}
              alt="Cobranças"
              onClick={() => {
                carregarCobrancasCliente()
                setMenuSelecionado('Cobrancas')
              }
              }
            />
            <span>Cobranças</span>
          </BrowserLink>
        </div>
      </Drawer>
    </div>

  );
}
