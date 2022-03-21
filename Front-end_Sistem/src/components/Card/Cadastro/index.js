import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import React, { useContext, useState } from "react";
import { Link as BrowserLink, useHistory } from "react-router-dom";
import BarraVerde from "../../../assets/icones_cadastro/icones_etapas_barra/etapa-atual-barra.svg";
import BarraVazia from "../../../assets/icones_cadastro/icones_etapas_barra/etapa-barra.svg";
import BolaVerde from "../../../assets/icones_cadastro/icones_etapas_bola/etapa-atual-bola.svg";
import BolaVazia from "../../../assets/icones_cadastro/icones_etapas_bola/etapa-bola.svg";
import Traco from "../../../assets/icones_cadastro/icones_etapas_bola/etapa-traco.svg";
import UserContext from "../../../contexts/userContext";
import useStyles from "./styles";

export default function Card() {
  const { nome, email, setEmail, setNome } = useContext(UserContext);
  const [todosEmails, setTodosEmails] = useState();
  const [erro, setErro] = useState();
  const history = useHistory();

  function DadosCadastro(e) {
    e.preventDefault();
    setErro(null);
    setEmail(email);
    setNome(nome);
    buscarEmailUsuarios();
    if (nome.length === 0) {
      setErro('o campo nome deve ser preenchido.');
      return;
    }
    if (email.length === 0) {
      setErro('o campo email deve ser preenchido.');
      return;
    }
    if (todosEmails.includes(email)) {
      setErro('email já cadastrado.');
      return;
    }
    if (!erro) {
      return;
    }
    history.push('/senha')
  }

  const classes = useStyles();

  const buscarEmailUsuarios = async (e) => {
    e.preventDefault();
    setErro(null);
    try {
      const response = await fetch(
        'https://api-projeto-final.herokuapp.com/usuarios/email',
        {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setTodosEmails(data);
      setEmail(email);
      setNome(nome);
      // buscarEmailUsuarios();
      if (nome.length === 0) {
        setErro('o campo nome deve ser preenchido.');
        return;
      }
      if (email.length === 0) {
        setErro('o campo email deve ser preenchido.');
        return;
      }
      console.log(todosEmails)
      console.log(email)
      console.log(todosEmails.includes(email))
      data && todosEmails.includes(email) ? setErro('email já cadastrado.') : history.push('/senha')
      // if (todosEmails.includes(email)) {
      //   setErro('email já cadastrado.');
      //   return;
      // }
      // if (!erro) {
      //   return;
      // }
      // history.push('/senha')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />

      <div className={classes.status}>
        <div className={classes.layoutPrincipal}>
          <div className={classes.iconesStatus}>
            <img src={BolaVerde} alt="" />
            <img className={classes.traco} src={Traco} alt="" />
            <img src={BolaVazia} alt="" />
            <img className={classes.traco} src={Traco} alt="" />
            <img src={BolaVazia} alt="" />
          </div>
          <div className={classes.caracterStatus}>
            <span className={classes.tituloVerde}>
              Cadastre-se <br />
            </span>
            <span className={classes.tituloCinza}>
              Por favor, escreva seu nome e e-mail
            </span>
            <span className={classes.tituloVerde}>
              Escolha uma senha <br />
            </span>
            <span className={classes.tituloCinza}>
              Escolha uma senha segura
            </span>
            <span className={classes.tituloVerde}>
              Cadastro realizado com sucesso <br />
            </span>
            <span className={classes.tituloCinza}>
              E-mail e senha cadastrados com sucesso
            </span>
          </div>
        </div>
      </div>

      <div className={classes.cardLeft}>
        <form className={classes.formulario} onSubmit={/* DadosCadastro */buscarEmailUsuarios}>
          <div className={classes.titulo}>
            <span className={classes.h1}>Adicione seus dados </span>
          </div>
          <div className={classes.element}>
            <div className={classes.txtForm}>
              <span className={classes.labelSenhaEmail}>Nome *</span>

              <TextField
                onChange={(e) => setNome(e.target.value)}
                value={nome}
                className={classes.margin}
                variant="outlined"
                error={erro && erro.includes('nome') ? true : false}
                placeholder="Digite seu nome"
                type="texto"
              />
              {erro && erro.includes('nome') && <span className={classes.spanErroCadastro}>{erro}</span>}
              <div className={classes.cabecalhoSenha}>
                <span className={classes.labelSenhaEmail}> E-mail *</span>
              </div>

              <TextField
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={classes.margin}
                placeholder="Digite seu e-mail"
                variant="outlined"
                error={erro && erro.includes('email') ? true : false}
                type="email"
              />
              {erro && erro.includes('email') && <span className={classes.spanErroCadastro}>{erro}</span>}
            </div>

            <div className={classes.button}>
              {/* <BrowserLink to="/senha" className={classes.buttonLink}> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                Continuar
              </Button>
              {/* </BrowserLink> */}

              <div className={classes.link}>
                <p>Já possui conta? Faça seu </p>

                <BrowserLink className={classes.cadastroLink} to="/">
                  {" "}
                  login
                </BrowserLink>
              </div>
            </div>
          </div>
        </form>
        <div className={classes.barraStatus}>
          <img src={BarraVerde} alt={BarraVerde} />
          <img src={BarraVazia} alt={BarraVazia} />
          <img src={BarraVazia} alt={BarraVazia} />
        </div>
      </div>
    </div>
  );
}
