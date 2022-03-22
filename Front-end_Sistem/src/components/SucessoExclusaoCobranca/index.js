import './styles.css';
import React from 'react';
import sucessoCobranca from '../../assets/exclusao-cobrancas/sucessoCobranca.svg';
import fecharModalSucesso from '../../assets/exclusao-cobrancas/fecharModalSucesso.svg';

const SucessoExclusaoCobranca = () => {
  return (
    <div className='sucessoExclusaoCobranca'>
      <img src={sucessoCobranca} alt="Excluida com sucesso" />
      Cobrança excluída com sucesso!
      <img src={fecharModalSucesso} alt="Fechar" className='fecharRespostaExclusaoCobranca' />
    </div>
  )
}

export default SucessoExclusaoCobranca;