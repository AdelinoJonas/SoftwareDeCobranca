import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './styles';
import Traco from '../../../assets/icones_cadastro/icones_etapas_bola/etapa-traco.svg';
import BarraVerde from '../../../assets/icones_cadastro/icones_etapas_barra/etapa-atual-barra.svg';
import BarraVazia from '../../../assets/icones_cadastro/icones_etapas_barra/etapa-barra.svg';
import Concluido from '../../../assets/icones_cadastro/icone-cadastro-concluido.svg';
import BolaConcluida from '../../../assets/icones_cadastro/icones_etapas_bola/etapa-concluida-bola.svg';
import { Link as BrowserLink } from 'react-router-dom';

export default function Card() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <div className={classes.status}>
        <div className={classes.layoutPrincipal}>
          <div className={classes.iconesStatus}>
            <img src={BolaConcluida} alt='' />
            <img className={classes.traco} src={Traco} alt='' />
            <img src={BolaConcluida} alt='' />
            <img className={classes.traco} src={Traco} alt='' />
            <img src={BolaConcluida} alt='' />
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
        <form className={classes.containerConcluido}>
            <div className={classes.concluido}>
              <img className={classes.checked} src={Concluido} alt='checked' />
              <h1 className={classes.h1}> Cadastro realizado com sucesso!</h1>
            </div>
            <div className={classes.button}>
              <BrowserLink className={classes.buttonLink} to='/'>
                <Button
                  type='submit'
                  variant='contained'
                  className={classes.submit}
                >
                  Ir para Login
                  
                </Button>
              </BrowserLink>
            </div>
          <div className={classes.barraStatus}>
            <img src={BarraVerde} alt={BarraVerde} />
            <img src={BarraVerde} alt={BarraVazia} />
            <img src={BarraVerde} alt={BarraVazia} />
          </div>
      </form>
      </div>
    </div>
  );
}
