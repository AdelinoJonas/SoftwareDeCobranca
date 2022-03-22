import './styles.css';
import React from 'react';
import erroCobranca from '../../assets/exclusao-cobrancas/erroCobranca.svg';
import fecharModalErro from '../../assets/exclusao-cobrancas/fecharModalErro.svg';

const ErroExclusaoCobranca = () => {
  return (
    <div className='erroExclusaoCobranca'>
      <img src={erroCobranca} alt="Erro na exclusão." />
      Esta cobrança não pode ser excluída!
      <img src={fecharModalErro} alt="Fechar" className='fecharRespostaExclusaoCobranca' />
    </div>
  )
}

export default ErroExclusaoCobranca;