import React, { useContext, useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import cobranca from '../../assets/icones-modal-cobranca/cobranca.svg';
import fechar from '../../assets/icones-modal-cobranca/fechar.svg';
import '../CadastroCobranca/style.css';
import UserContext from '../../contexts/userContext';
import '../DetalhesCliente';
import '../TabelaClientes';
import '../../components/CobrancaLista';

import useStyles from './style';

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [editStatus, setEditStatus] = useState(true);
  const [editStatusVencer, setEditStatusVencer] = useState(false);
  const {
    editDescricao,
    setEditDescricao,
    editValor,
    setEditValor,
    editVencimento,
    setEditVencimento,
    editId,
    token,
    editNome,
    idCliente,
    nomeCliente,
    setIdCliente,
    setNomeCliente,
    dadosCliente,
    carregarDadosCliente
  } = useContext(UserContext);

  async function EditarCobrancaApi(e, id) {
    e.preventDefault();

    try {
      const cobranca = {
        id: editId,
        descricao: editDescricao,
        status: editStatus,
        status: editStatusVencer,
        vencimento: editVencimento,
        valor: editValor,
      };
      const response = await fetch(
        `https://api-projeto-final.herokuapp.com/cobrancas/${id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token ? token : window.localStorage.getItem("token")
              }`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cobranca),
        }
      );

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
        className={classes.modal}
        open={props.open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <form onSubmit={(e) => EditarCobrancaApi(e, editId)}>
            <div className={classes.paper}>
              <div className='cardPrincipal'>
                <div className={classes.headerModal}>
                  <img className='cobrancaIcone' src={cobranca} alt='' />
                  <h2 className='tituloHeader' id='transition-modal-title'>
                    Editar Cobran??a
                  </h2>
                  <img
                    onClick={props.fecharModalEditCobr}
                    className='fecharIcone'
                    src={fechar}
                  />
                </div>
                <div className='inputs'>
                  <span className='labelSpan'>Nome *</span>
                  <input className='nomeInput' value={editNome} type='text' />

                  <span className='labelSpan'>Descri????o*</span>

                  <input
                    className='descricao'
                    value={editDescricao}
                    onChange={(e) => setEditDescricao(e.target.value)}
                    type='text'
                  />
                </div>

                <div className='DivValorVencimento'>
                  <div className='labelSecundaria'>
                    <span className='labelVencimento'>Vencimento *</span>
                    <input
                      className='inputVencimento'
                      value={editVencimento}
                      placeholder='Data de Vencimento'
                      onChange={(e) => setEditVencimento(e.target.value)}
                      type='date'
                    />
                  </div>

                  <div className='labelSecundaria'>
                    <span className='labelValor'>Valor*</span>
                    <input
                      name='price'
                      mask='currency'
                      prefix='R$'
                      className='inputValor'
                      value={editValor}
                      onChange={(e) => setEditValor(e.target.value)}
                      placeholder='Digite o Valor '
                      type='number'
                    />
                  </div>
                </div>
                <div className='statusCobranca'>
                  <span className='labelSpan'>Status *</span>
                  <div>
                    <div className='checkboxInput'>
                      <input
                        onChange={(e) => setEditStatus(false)}
                        className='checkbox'
                        type='radio'
                        name=' statusCobranca'
                      />
                      <label className='labelCheck' for='cobran??apaga'>
                        Cobran??a Paga
                      </label>
                    </div>
                    <div className='checkboxInput'>
                      <input
                        className='checkbox'
                        onChange={(e) => setEditStatusVencer(true)}
                        type='radio'
                        value='contapendente'
                        name=' statusCobranca'
                        checked
                      />
                      <label className='labelCheck' for='cobran??apaga'>
                        Cobran??a Pendente
                      </label>
                    </div>
                  </div>
                  <div className='buttonSubmitCobranca'>
                    <button
                      className='buttonCancela'
                      onClick={props.fecharModalEditCobr}
                    >
                      Cancelar
                    </button>
                    <button className='buttonAplicar' type='submit'>
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
