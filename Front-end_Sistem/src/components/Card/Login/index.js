import React, { useState, useContext } from "react";
import { Link as BrowserLink, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Link from "@material-ui/core/Link";
import UserContext from "../../../contexts/userContext";
import useStyles from "./styles";
import "./style.css";

export default function Card() {
  const { setLoadInfo, setToken, loadInfo, dadosCliente } =
    useContext(UserContext);

  const classes = useStyles();
  const [emailLogin, setEmailLogin] = useState(""); //PUT
  const [senhaLogin, setSenhaLogin] = useState({
    password: "",
    showPassword: false,
  }); //PUT

  const [emailErro, setEmailErro] = useState("");
  const [senhaErro, setSenhaErro] = useState("");

  const history = useHistory();

  const [erro, setErro] = useState("");

  const clickShowPassword = () => {
    setSenhaLogin({ ...senhaLogin, showPassword: !senhaLogin.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (prop) => (event) => {
    setSenhaLogin({ ...senhaLogin, [prop]: event.target.value });
  };

  const redirecinarParaHome = () => {
    if (window.localStorage.getItem("token")) {
      history.push("/home");
    }
  };

  function confereEmail(e) {
    if (!emailLogin.length) {
      setErro("Esse campo deve ser preenchido");
    } else if (erro) {
      setErro("E-mail não cadastrado");
    } else if (!erro) {
      setErro("");
    }
  }
  function confereSenha() {
    if (!senhaLogin.password.length) {
      setSenhaErro("Esse campo deve ser preenchido");
    } else if (senhaErro) {
      setSenhaErro("Senha Incorreta");
    } else {
      setSenhaErro("");
    }
  }

  async function cadastroUsuario(e) {
    e.preventDefault();

    const dados = { email: emailLogin, senha: senhaLogin.password };

    try {
      const response = await fetch(
        "https://api-projeto-final.herokuapp.com/login",
        {
          method: "POST",
          headers: {
            // Authorization:
            //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY0NDYxODI1Nn0.h72x0gApk1DXpaOE6KgFSvNhOUvWByY2RuyXdMXVXgk",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dados),
        }
      );

      const resposta = await response.json();
      console.log(resposta);

      if (resposta.token) {
        const token = resposta.token;
        window.localStorage.setItem("token", token);
        setToken(token);
      }
      if (resposta.erro) {
        setErro(resposta.erro);
      }
      redirecinarParaHome();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />

      <div className={classes.status}>
        <h1 className="textoLateral">
          Gerencie todos os pagamentos da sua empresa em um só lugar.
        </h1>
      </div>

      <div className={classes.cardLeft}>
        <form onSubmit={cadastroUsuario}>
          <div className={classes.titulo}>
            <span className={classes.h1}>Faça seu login! </span>
          </div>
          <div className={classes.element}>
            <div className={classes.txtForm}>
              <span className={classes.labelSenhaEmail}>E-mail</span>
              <input
                className="margin"
                className={
                  erro && erro.includes("email")
                    ? "margin inputSenha erro-input"
                    : "margin inputSenha"
                }
                placeholder="Digite seu email"
                type="email"
                variant="outlined"
                onChange={(e) => setEmailLogin(e.target.value)}
                value={emailLogin}
              />

              {erro && erro.includes("email") && (
                <div className="erro">{erro}</div>
              )}

              <div className={classes.cabecalhoSenha}>
                <span className={classes.labelSenhaEmail}> Senha </span>

                <Link>
                  <span className={classes.esqueceuSenha}>
                    Esqueceu a senha?
                  </span>
                </Link>
              </div>
              <div
                className={
                  erro && erro.includes("senha")
                    ? "inputSenha erro-input"
                    : "inputSenha"
                }
              >
                <input
                  className={classes.margin}
                  placeholder="Digite sua senha"
                  type={senhaLogin.showPassword ? "text" : "password"}
                  variant="outlined"
                  onChange={handleChange("password")}
                  value={senhaLogin.password}
                />
                <IconButton
                  className="iconeSenha"
                  onClick={clickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {senhaLogin.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </div>
              {erro && erro.includes("senha") && (
                <div className="erro">{erro}</div>
              )}
            </div>

            <div className={classes.button}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                Continuar
              </Button>

              <div className={classes.linkPrincipal}>
                <p className={classes.link}>Ainda não tem uma conta? </p>

                <BrowserLink className={classes.login} to="/cadastro">
                  {" "}
                  cadastre-se
                </BrowserLink>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
