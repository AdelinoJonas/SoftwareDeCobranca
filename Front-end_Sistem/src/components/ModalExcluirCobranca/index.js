import React, { useContext, useState } from 'react';
import './styles.css';
import iconeFechar from '../../assets/incones_card_cobranca/icone-fechar.svg';
import iconeExcluirCobranca from '../../assets/icone-excluir-cobranca.svg';
import UserContext from '../../contexts/userContext';
import { isAfter, parseISO } from 'date-fns'

const ModalExcluirCobranca = () => {

  const {
    idCobranca,
    setOpenExclusaoCobrancas,
    carregarCobrancasCliente,
    carregarDadosCliente,
    obterCobranca,
    cobrancaDetalhada,
    setModalErroExclusaoCobranca,
    setModalSocessoExclusaoCobranca
  } = useContext(UserContext);

  const excluirCobranca = async (id) => {
    try {
      if (!cobrancaDetalhada.status || isAfter(new Date(), parseISO(cobrancaDetalhada.vencimento))) {
        setOpenExclusaoCobrancas(false);
        setModalErroExclusaoCobranca(true);
        setTimeout(() => {
          setModalErroExclusaoCobranca(false);
        }, 3000)
        return
      }

      const response = await fetch(
        `https://api-projeto-final.herokuapp.com/cobrancas/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      console.log(data);
      carregarCobrancasCliente();
      carregarDadosCliente(localStorage.getItem('idCliente'));
      setOpenExclusaoCobrancas(false);
      setModalSocessoExclusaoCobranca(true);
      setTimeout(() => {
        setModalSocessoExclusaoCobranca(false);
      }, 3000)
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {
        /* cobrancaDetalhada && */ <div className='fundoModal'>
          <div className='cardExcluirCobranca'>
            <img
              className='fecharDetalheCobranca'
              src={iconeFechar}
              alt='Fechar'
              onClick={() => setOpenExclusaoCobrancas(false)}
            />
            <img
              className='iconeExcluir'
              src={iconeExcluirCobranca}
              alt='Excluir cobrança'
            />
            <p>Tem certeza que deseja excluir esta cobrança?</p>
            <div className='botoesExcluir'>
              <button
                className='naoExcluir'
                onClick={() => setOpenExclusaoCobrancas(false)}
              >
                Não
              </button>
              <button
                className='excluirSim'
                onClick={() => {
                  excluirCobranca(idCobranca);
                }}
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default ModalExcluirCobranca;
