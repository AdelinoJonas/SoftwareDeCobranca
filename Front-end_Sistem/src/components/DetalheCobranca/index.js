import React, { useContext } from 'react';
import './styles.css';
import iconeFechar from '../../assets/incones_card_cobranca/icone-fechar.svg';
import iconeArquivo from '../../assets/incones_card_cobranca/icone-arquivo.svg';
import UserContext from '../../contexts/userContext';
import { format, isAfter, parseISO } from 'date-fns'

const DatalhesCobranca = () => {
  const { 
    cobrancaDetalhada, 
    setOpenModalCobrancas,
  } = useContext(UserContext);


  return (
    <>
      {cobrancaDetalhada && <div className="fundoModal">
        <div className='cardDetalhesCobranca'>
          <img
            className='fecharDetalheCobranca'
            src={iconeFechar} alt="Fechar"
            onClick={() => setOpenModalCobrancas(false)}
          />
          <div className="cardHeader">
            <img src={iconeArquivo} alt="" />
            <h1>Detalhe da Cobrança</h1>
          </div>
          <h3 className='detalheCobrancaH3'>Nome</h3>
          <p className='dinamico'>
            {cobrancaDetalhada.nome_cliente}
          </p>
          <h3 className='detalheCobrancaDescricao'>
            Descrição
          </h3>
          <p className='dinamico'>
            {cobrancaDetalhada.descricao}
          </p>
          <div className="rodapeCardCobranca">
            <div className="vencimentoId">
              <h3 className='detalheCobrancaH3'>
                Vencimento
              </h3>
              <p className='dinamico'>
                {format(new Date(cobrancaDetalhada.vencimento), 'dd/MM/yyy')}
              </p>
              <h3 className='detalheCobrancaH3'>
                ID cobranças
              </h3>
              <p className='dinamico'>
                {cobrancaDetalhada.id}
              </p>
            </div>
            <div className="valorStatus">
              <h3 className='detalheCobrancaH3'>Valor</h3>
              <p className='dinamico'>{(cobrancaDetalhada.valor / 100).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}</p>
              <h3 className='detalheCobrancaH3'>Status</h3>
              <p className={
                !cobrancaDetalhada.status
                  ? 'paga'
                  : cobrancaDetalhada.status &&
                    isAfter(new Date(), parseISO(cobrancaDetalhada.vencimento))
                    ? 'vencida'
                    : 'pendente'
              }>{!cobrancaDetalhada.status
                ? 'Paga'
                : cobrancaDetalhada.status &&
                  isAfter(new Date(), parseISO(cobrancaDetalhada.vencimento))
                  ? 'Vencida'
                  : 'Pendente'}</p>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default DatalhesCobranca;