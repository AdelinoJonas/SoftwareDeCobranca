import React, { useState, useContext, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import UserContext from '../../contexts/userContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import useStyles from './styles';
import BolaConcluida from '../../assets/icones_cadastro/icones_etapas_bola/etapa-concluida-bola.svg';
import BolaVazia from '../../assets/icones_cadastro/icones_etapas_bola/etapa-bola.svg';
import BolaVerde from '../../assets/icones_cadastro/icones_etapas_bola/etapa-atual-bola.svg';
import Traco from '../../assets/icones_cadastro/icones_etapas_bola/etapa-traco.svg';
import BarraVerde from '../../assets/icones_cadastro/icones_etapas_barra/etapa-atual-barra.svg';
import BarraVazia from '../../assets/icones_cadastro/icones_etapas_barra/etapa-barra.svg';
import { Link as BrowserLink, useHistory } from 'react-router-dom';
import './button.css';

export default function Card() {
  const { nome, email } = useContext(UserContext);

  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });
  const [valuesPassword, setValuesPassword] = React.useState({
    repeatPassword: '',
    showRepeatPassword: false,
  });
  const history = useHistory();

  const [erroEmailApi, setErroEmailApi] = useState([]);

  const classes = useStyles(false);

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const mostrarSenha = (props) => (e) => {
    setValuesPassword({ ...valuesPassword, [props]: e.target.value });
  };
  const handleClickShowRepeatPassword = () => {
    setValuesPassword({
      ...valuesPassword,
      showRepeatPassword: !valuesPassword.showRepeatPassword,
    });
  };

  async function CadastroUsuario(e) {
    e.preventDefault();
    setErroEmailApi(null);

    try {

      const dados = {
        nome,
        email,
        senha: values.password,
      };

      // ConfereSenha();
      if (values.password !== valuesPassword.repeatPassword) {
        setErroEmailApi('As senhas não conferem');
        return;
      }
      if (valuesPassword.repeatPassword.length === 0) {
        setErroEmailApi('Todos os campos devem ser preenchidos');
        console.log(erroEmailApi)
        return;
      }

      const response = await fetch(
        'https://api-projeto-final.herokuapp.com/usuarios',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dados),
        }
      );
      const resposta = await response.json();
      console.log(resposta)
      if (resposta.erro) {
        console.log(resposta.erro);
        setErroEmailApi(resposta.erro);
        return;
      }

      history.push('/cadastroConcluido');
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />

      <div className={classes.status}>
        <div className={classes.layoutPrincipal}>
          <div className={classes.iconesStatus}>
            <img src={BolaConcluida} alt='' />
            <img className={classes.traco} src={Traco} alt='' />
            <img src={BolaVerde} alt='' />
            <img className={classes.traco} src={Traco} alt='' />
            <img src={BolaVazia} alt={BolaVazia} />
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
        <form
          className={classes.formulario}
          action=''
          method='post'
          onSubmit={CadastroUsuario}
        >
          <div className={classes.titulo}>
            <span className={classes.h1}>Escolha uma senha</span>
          </div>
          <div className={classes.element}>
            <div className={classes.txtForm}>
              <span className={classes.labelSenhaEmail}>Senha *</span>
              {/* { */}
              <div className={erroEmailApi && (erroEmailApi.includes('senha') || erroEmailApi.includes('Todos'))
                ? 'spanErroCadastro estiloInput'
                : 'estiloInput'}>
                <input
                  className={{ root: 'estiloInput' }}
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  name='senha'
                  placeholder='Digite sua senha'
                  onChange={handleChange('password')}
                />
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </div>
              {erroEmailApi
                && (erroEmailApi.includes('senha') || erroEmailApi.includes('Todos'))
                && <span className={classes.spanErroCadastro}>{erroEmailApi}</span>}
              {/* } */}
              <span className={classes.labelSenhaEmail}> Repita a senha *</span>

              <div>
                <div className={erroEmailApi && (erroEmailApi.includes('senhas') || erroEmailApi.includes('Todos'))
                  ? 'spanErroCadastro estiloInput'
                  : 'estiloInput'}>
                  <input
                    classes={{ root: 'estiloInput' }}
                    type={
                      valuesPassword.showRepeatPassword ? 'text' : 'password'
                    }
                    value={valuesPassword.repeatPassword}
                    placeholder='Repita sua senha'
                    onChange={mostrarSenha('repeatPassword')}
                  />
                  <IconButton
                    onClick={handleClickShowRepeatPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {valuesPassword.showRepeatPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </div>
                {erroEmailApi
                  && (erroEmailApi.includes('senhas') || erroEmailApi.includes('Todos'))
                  && <span className={classes.spanErroCadastro}>{erroEmailApi}</span>}

                {/* {erro && <div className='erro'>{erro}</div>} */}
              </div>
            </div>

            <div className={classes.button}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                className={classes.submit}
              >
                Entrar
              </Button>

              <div className={classes.link}>
                <p>Já possui conta? Faça seu </p>

                <BrowserLink className={classes.cadastroLink} to='/'>
                  {' '}
                  login
                </BrowserLink>
              </div>
            </div>
          </div>
        </form>
        <div className={classes.barraStatus}>
          <img src={BarraVazia} alt={BarraVazia} />
          <img src={BarraVerde} alt={BarraVerde} />
          <img src={BarraVazia} alt={BarraVazia} />
        </div>
      </div>
    </div>
  );
}
