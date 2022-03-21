import { useState, useEffect } from 'react';
import './App.css';
import UserContext from './contexts/userContext';
import Rotas from './Rotas/rotas';

function App() {
  const [modal, setModal] = useState(false);
  const [editarModal, setEditarModal] = useState(false);
  const [dadosCliente, setDadosCliente] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [cobrancas, setCobrancas] = useState([]);
  const [registrosSrc, setRegistrosSrc] = useState([]);
  const [cobrancasSrc, setCobrancasSrc] = useState([]);
  const [pesquisaCliente, setPesquisaCliente] = useState('');
  const [pesquisaCobranca, setPesquisaCobranca] = useState('');
  const [ordenar, setOrdenar] = useState('');

  const [open, setOpen] = useState(false);
  const [abrirModal, setAbrirModal] = useState(false);
  const [openModalCob, setOpenModalCob] = useState(false);

  const [openModalConfirmacao, setOpenModalConfirmacao] = useState(false);
  const [show, setShow] = useState(false);
  const [loadInfo, setLoadInfo] = useState([]);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState();

  const [idCliente, setIdCliente] = useState();
  const [nomeCliente, setNomeCliente] = useState();

  const [cobrancaDetalhada, setCobrancaDetalhada] = useState();
  const [openModalCobrancas, setOpenModalCobrancas] = useState(false);
  const [openExclusaoCobrancas, setOpenExclusaoCobrancas] = useState(false);
  const [idCobranca, setIdCobranca] = useState();

  const [emailErro, setEmailErro] = useState('');
  const [senhaErro, setSenhaErro] = useState('');

  const [emailValidacao, setEmailValidacao] = useState('');
  const [senhaValidacao, setSenhaValidacao] = useState('');

  const [editDescricao, setEditDescricao] = useState('');
  const [editValor, setEditValor] = useState('');
  const [editVencimento, setEditVencimento] = useState('');

  const [homeCobrancaPrevistaTotal, setHomeCobrancaPrevistaTotal] = useState(
    []
  );
  const [homeCobrancaVencidaTotal, setHomeCobrancaVencidaTotal] = useState([]);
  const [homeCobrancaPagaTotal, setHomeCobrancaPagaTotal] = useState([]);
  const [homeValorCobrancaPagaTotal, setHomeValorCobrancaPagaTotal] = useState();
  const [homeValorCobrancaVencidaTotal, setHomeValorCobrancaVencidaTotal] = useState();
  const [homeValorCobrancaPrevistaTotal, setHomeValorCobrancaPrevistaTotal] = useState();
  const [homeCobrancasPrevistas, setHomeCobrancasPrevistas] = useState([]);
  const [homeCobrancasVencidas, setHomeCobrancasVencidas] = useState([]);
  const [homeCobrancasPagas, setHomeCobrancasPagas] = useState([]);
  const [homeClientesInadimplentes, setHomeClientesInadimplentes] = useState([]);
  const [homeClientesEmDia, setHomeClientesEmDia] = useState([]);
  const [homeCobrancaPrevistaQuantidade, setHomeCobrancaPrevistaQuantidade] = useState([]);

  const [homeCobrancaVencidaQuantidade, setHomeCobrancaVencidaQuantidade] = useState([]);
  const [homeCobrancaPagaQuantidade, setHomeCobrancaPagaQuantidade] = useState([]);
  const [homeCobrancaPrevistaQuatro, setHomeCobrancaPrevistaQuatro] = useState([]);
  const [homeCobrancaPrevistaFiltrada, setHomeCobrancaPrevistaFiltrada] = useState([]);

  const [homeCobrancaVencidaQuatro, setHomeCobrancaVencidaQuatro] = useState([]);
  const [homeCobrancaPagaQuatro, setHomeCobrancaPagaQuatro] = useState([]);

  const [homeValorTotalClienteInad, setHomeValorTotalClienteInad] = useState([]);
  const [homeValorTotalClienteAdim, setHomeValorTotalClienteAdim] = useState([]);
  const [homeClientesInadFiltro, setHomeClientesInadFiltro] = useState([]);
  const [homeClientesAdimFiltro, setHomeClientesAdimFiltro] = useState([]);
  const [homeClientesInadFiltroQuatro, setHomeClientesInadFiltroQuatro] = useState([]);
  const [homeClientesAdimFiltroQuatro, setHomeClientesAdimFiltroQuatro] = useState([]);
  const [clienteClientesInadFiltro, setClienteClientesInadFiltro] = useState([]);
  const [clienteClientesAdimFiltro, setClienteClientesAdimFiltro] = useState([]);

  const [boleanoFiltroClientesEmDia, setBoleanoFiltroClientesEmDia] = useState(false)
  const [boleanoFiltroClientesInad, setBoleanoFiltroClientesInad] = useState(false)
  const [boleanoFiltroCobrancaVenc, setBoleanoFiltroCobrancaVenc] = useState(false)
  const [boleanoFiltroCobrancaPaga, setBoleanoFiltroCobrancaPaga] = useState(false)
  const [boleanoFiltroCobrancaPrev, setBoleanoFiltroCobrancaPrev] = useState(false)

  const [modalSocessoExclusaoCobranca, setModalSocessoExclusaoCobranca] = useState(false);
  const [modalErroExclusaoCobranca, setModalErroExclusaoCobranca] = useState(false);

  const [editNome, setEditNome] = useState('');
  const [editId, setEditId] = useState('');

  useEffect(() => {
    carregarRegistros();
    handleLoadInfoCobrancasPagasTotais();
    handleLoadInfoCobrancasVencidasTotais();
    handleLoadInfoCobrancasPrevistasTotais();
  }, [token]);

  function funcaoLimparPagCobrancaEClientes() {
    if (window.location.pathname === '/home') {
      setBoleanoFiltroCobrancaVenc(false);
      setBoleanoFiltroCobrancaPaga(false);
      setBoleanoFiltroCobrancaPrev(false);
      setBoleanoFiltroClientesEmDia(false);
      setBoleanoFiltroClientesInad(false)
    }
    if (window.location.pathname === '/clientes') {
      setBoleanoFiltroCobrancaVenc(false);
      setBoleanoFiltroCobrancaPaga(false);
      setBoleanoFiltroCobrancaPrev(false);
    }
    if (window.location.pathname === '/cobrancas') {
      setBoleanoFiltroClientesEmDia(false);
      setBoleanoFiltroClientesInad(false)
    }
  }

  useEffect(() => {
    funcaoLimparPagCobrancaEClientes()
  }, [nome, token, homeClientesInadFiltro, cobrancas, registrosSrc, homeClientesAdimFiltro, homeCobrancaPrevistaFiltrada])

  async function carregarDadosCliente(id) {
    try {
      const response = await fetch(
        `https://api-projeto-final.herokuapp.com/clientes/${id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const dados = await response.json();
      setDadosCliente(dados);
      window.localStorage.setItem('dadosClienteStorage', JSON.stringify(dados));
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleLoadInfo() {
    try {
      const response = await fetch(
        'https://api-projeto-final.herokuapp.com/usuario',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token ? token : window.localStorage.getItem("token")
              }`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setLoadInfo(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleLoadInfo();
  }, [open]);

  async function carregarRegistros() {
    try {
      const response = await fetch(
        'https://api-projeto-final.herokuapp.com/clientes',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token ? token : window.localStorage.getItem("token")
              }`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      setRegistros(data);
      setRegistrosSrc(data);
      window.localStorage.setItem(
        "dadosClienteStorage",
        JSON.stringify(data)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  const obterCobranca = async (id) => {
    try {
      const response = await fetch(
        `https://api-projeto-final.herokuapp.com/detalharcobranca/${id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setCobrancaDetalhada(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  async function handleLoadInfoCobrancasPagasTotais() {
    try {
      const response = await fetch(
        'https://api-projeto-final.herokuapp.com/cobrancaspagas',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token ? token : window.localStorage.getItem("token")
              }`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setHomeCobrancaPagaTotal(data);

      window.localStorage.setItem(
        'homeCobrancaPagaTotalStorage',
        JSON.stringify(data)
      );
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   handleLoadInfoCobrancasPagasTotais();
  // }, [cobrancas]);

  async function handleLoadInfoCobrancasVencidasTotais() {
    try {
      const response = await fetch(
        'https://api-projeto-final.herokuapp.com/cobrancasvencidas',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token ? token : window.localStorage.getItem("token")
              }`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setHomeCobrancaVencidaTotal(data);
      window.localStorage.setItem(
        'homeCobrancaVencidaTotalStorage',
        JSON.stringify(data)
      );
    } catch (error) {
      console.log(error);
    }
  }
  // useEffect(() => {
  //   handleLoadInfoCobrancasVencidasTotais();
  // }, [cobrancas]);

  async function handleLoadInfoCobrancasPrevistasTotais() {
    try {
      const response = await fetch(
        'https://api-projeto-final.herokuapp.com/cobrancaspendentes',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token ? token : window.localStorage.getItem("token")
              }`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setHomeCobrancaPrevistaTotal(data);
      window.localStorage.setItem(
        'homeCobrancaPrevistaTotalStorage',
        JSON.stringify(data)
      );
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   handleLoadInfoCobrancasPrevistasTotais();
  // }, [cobrancas]);

  async function carregarCobrancasCliente() {
    try {
      const response = await fetch(
        'https://api-projeto-final.herokuapp.com/cobrancas',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token ? token : window.localStorage.getItem("token")
              }`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setCobrancas(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <UserContext.Provider
      value={{
        nome,
        email,
        setNome,
        setEmail,
        dadosCliente,
        setDadosCliente,
        modal,
        setModal,
        editarModal,
        setEditarModal,
        registros,
        setRegistros,
        cobrancas,
        setCobrancas,
        open,
        setOpen,
        openModalConfirmacao,
        setOpenModalConfirmacao,
        show,
        setShow,
        loadInfo,
        setLoadInfo,
        carregarRegistros,
        token,
        setToken,
        idCliente,
        setIdCliente,
        carregarDadosCliente,
        nomeCliente,
        setNomeCliente,
        abrirModal,
        setAbrirModal,
        openModalCob,
        setOpenModalCob,
        cobrancaDetalhada,
        obterCobranca,
        openModalCobrancas,
        setOpenModalCobrancas,
        openExclusaoCobrancas,
        setOpenExclusaoCobrancas,
        idCobranca,
        setIdCobranca,
        registrosSrc,
        setRegistrosSrc,
        cobrancasSrc,
        setCobrancasSrc,
        pesquisaCliente,
        setPesquisaCliente,
        pesquisaCobranca,
        setPesquisaCobranca,
        ordenar,
        setOrdenar,
        handleLoadInfo,
        emailValidacao,
        setEmailValidacao,
        senhaValidacao,
        setSenhaValidacao,
        senhaErro,
        setSenhaErro,
        emailErro,
        setEmailErro,
        homeCobrancasPrevistas,
        setHomeCobrancasPrevistas,
        homeCobrancasVencidas,
        setHomeCobrancasVencidas,
        homeCobrancasPagas,
        setHomeCobrancasPagas,
        homeClientesInadimplentes,
        setHomeClientesInadimplentes,
        homeClientesEmDia,
        setHomeClientesEmDia,
        homeCobrancaPrevistaTotal,
        setHomeCobrancaPrevistaTotal,
        homeCobrancaVencidaTotal,
        setHomeCobrancaVencidaTotal,
        homeCobrancaPagaTotal,
        setHomeCobrancaPagaTotal,
        homeValorCobrancaPagaTotal,
        setHomeValorCobrancaPagaTotal,
        homeValorCobrancaVencidaTotal,
        setHomeValorCobrancaVencidaTotal,
        homeValorCobrancaPrevistaTotal,
        setHomeValorCobrancaPrevistaTotal,
        homeCobrancaPrevistaQuantidade,
        setHomeCobrancaPrevistaQuantidade,
        homeCobrancaVencidaQuantidade,
        setHomeCobrancaVencidaQuantidade,
        homeCobrancaPagaQuantidade,
        setHomeCobrancaPagaQuantidade,
        carregarCobrancasCliente,
        homeValorTotalClienteInad,
        setHomeValorTotalClienteInad,
        homeValorTotalClienteAdim,
        setHomeValorTotalClienteAdim,
        homeCobrancaPrevistaQuatro,
        setHomeCobrancaPrevistaQuatro,
        homeCobrancaVencidaQuatro,
        setHomeCobrancaVencidaQuatro,
        homeCobrancaPagaQuatro,
        setHomeCobrancaPagaQuatro,
        homeClientesInadFiltro,
        setHomeClientesInadFiltro,
        homeClientesAdimFiltro,
        setHomeClientesAdimFiltro,
        homeClientesInadFiltroQuatro,
        setHomeClientesInadFiltroQuatro,
        homeClientesAdimFiltroQuatro,
        setHomeClientesAdimFiltroQuatro,
        editNome,
        setEditNome,
        editId,
        setEditId,
        boleanoFiltroClientesEmDia,
        editDescricao,
        setEditDescricao,
        editValor,
        setEditValor,
        editVencimento,
        setEditVencimento,
        boleanoFiltroClientesEmDia,
        setBoleanoFiltroClientesEmDia,
        boleanoFiltroClientesInad,
        setBoleanoFiltroClientesInad,
        boleanoFiltroCobrancaVenc,
        setBoleanoFiltroCobrancaVenc,
        boleanoFiltroCobrancaPaga,
        setBoleanoFiltroCobrancaPaga,
        boleanoFiltroCobrancaPrev,
        setBoleanoFiltroCobrancaPrev,
        homeCobrancaPrevistaFiltrada,
        setHomeCobrancaPrevistaFiltrada,
        clienteClientesInadFiltro,
        setClienteClientesInadFiltro,
        clienteClientesAdimFiltro,
        setClienteClientesAdimFiltro,
        modalSocessoExclusaoCobranca,
        setModalSocessoExclusaoCobranca,
        modalErroExclusaoCobranca,
        setModalErroExclusaoCobranca
      }}
    >
      <Rotas />
    </UserContext.Provider>
  );
}

export default App;
