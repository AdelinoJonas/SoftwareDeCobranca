import React, { useContext, useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import cobranca from '../../assets/icones-modal-cobranca/cobranca.svg';
import fechar from '../../assets/icones-modal-cobranca/fechar.svg';
import '../CadastroCobranca/style.css';
import UserContext from '../../contexts/userContext';

import useStyles from './style';

export default function ModalListaCliente(props) {
  const [descricao, setDescricao] = useState('');
  const [vencimento, setVencimento] = useState('');
  const [valor, setValor] = useState();
  const [status, setStatus] = useState(true);
  const [statusVencer, setStatusVencer] = useState(false);
  const classes = useStyles();
  const { idCliente, nomeCliente, SetNomeCliente, dadosCliente, token, carregarDadosCliente } =
    useContext(UserContext);

  async function CadastroCobrancaListaCliente(e) {
    e.preventDefault();

    try {
      //if (!nomeCliente || !descricao || !vencimento || !valor) return;

      const cobranca = {
        descricao,
        nome_cliente: nomeCliente,
        cliente_id: idCliente,
        status: statusVencer,
        vencimento,
        valor,
      };

      const response = await fetch(
        'https://api-projeto-final.herokuapp.com/cobrancas',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token ? token : window.localStorage.getItem("token")
              }`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cobranca),
        }
      );
      console.log(cobranca);
      const data = await response.json();
      console.log(data);
      carregarDadosCliente(localStorage.getItem('idCliente'));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Modal
        className={classes.modal02}
        open={props.open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade onSubmit={CadastroCobrancaListaCliente} in={props.open}>
          <form onSubmit={CadastroCobrancaListaCliente}>
            <div className={classes.paper}>
              <div className='cardPrincipal'>
                <div className={classes.headerModal}>
                  <img className='cobrancaIcone' src={cobranca} alt='' />
                  <h2 className='tituloHeader'>Cadastro Cobrança</h2>
                  <img
                    onClick={props.fecharModal}
                    className='fecharIcone'
                    src={fechar}
                  />
                </div>
                <div className='inputs'>
                  <span className='labelSpan'>Nome *</span>
                  <input
                    className='nomeInput'
                    value={nomeCliente}
                    type='text'
                  ></input>

                  <span className='labelSpan'>Descrição*</span>

                  <input
                    className='descricao'
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    type='text'
                  />
                </div>

                <div className='DivValorVencimento'>
                  <div className='labelSecundaria'>
                    <span className='labelVencimento'>Vencimento *</span>
                    <input
                      className='inputVencimento'
                      value={vencimento}
                      placeholder='Data de Vencimento'
                      onChange={(e) => setVencimento(e.target.value)}
                      type='date'
                    />
                  </div>

                  <div className='labelSecundaria'>
                    <span className='labelValor'>Valor*</span>
                    <input
                      className='inputValor'
                      value={valor}
                      onChange={(e) => setValor(e.target.value)}
                      placeholder='Digite o Valor '
                      type='number'
                    />
                  </div>
                </div>
                <div className='statusCobranca'>
                  <span className='labelSpan'>Status *</span>
                  <div className='checkboxInput'>
                    <input
                      onChange={(e) => setStatus(false)}
                      className='checkbox'
                      type='radio'
                      name='checkboxStatus'
                    />
                    <label className='labelCheck' for='cobrançapaga'>
                      Cobrança Paga
                    </label>
                  </div>
                  <div className='checkboxInput'>
                    <input
                      className='checkbox'
                      onChange={(e) => setStatusVencer(true)}
                      type='radio'
                      checked
                      name='checkboxStatus'
                    />
                    <label className='labelCheck' for='cobrançapaga'>
                      Cobrança Pendente
                    </label>
                  </div>
                  <div className='buttonSubmitCobranca'>
                    <button className='buttonCancela'>Cancelar</button>
                    <button
                      onClick={props.fecharModal}
                      className='buttonAplicar'
                      type='submit'
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Fade>
      </Modal>
    </div>
  );
}
