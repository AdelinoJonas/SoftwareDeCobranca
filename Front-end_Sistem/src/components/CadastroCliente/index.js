import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useState, useContext, useEffect } from 'react';
import iconDados from '../../assets/icones_clientes/iconDadosCliente.svg';
import iconClose from '../../assets/icones_clientes/icone-cadastro-cliente-fechar.svg';
import useStyles from './stylesDentroUI';
import './stylesForaUI.css';
import UserContext from '../../contexts/userContext';

export default function CadastroCliente() {
  const dadosNoStorage = JSON.parse(

    localStorage.getItem("dadosClienteStorage")
  );
  const idStorage = localStorage.getItem("idCliente");

  const classes = useStyles();
  const {
    modal,
    setModal,
    editarModal,
    setEditarModal,
    dadosCliente,
    carregarRegistros,
    idCliente,
    setDadosCliente,
  } = useContext(UserContext);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [status, setStatus] = useState(true);
  const [erro, setErro] = useState('');
  const [atualizaClientes, setAtualizaClientes] = useState(false);

  useEffect(() => {
    if (editarModal) {
      handleEditarModal();
    }
  }, [editarModal, modal]);

  function handleEditarModal() {
    setNome(dadosCliente.nome ? dadosCliente.nome : dadosNoStorage.nome);
    setEmail(dadosCliente.email ? dadosCliente.email : dadosNoStorage.email);
    setCpf(dadosCliente.cpf ? dadosCliente.cpf : dadosNoStorage.cpf);
    setTelefone(
      dadosCliente.telefone ? dadosCliente.telefone : dadosNoStorage.telefone
    );
    setCep(dadosCliente.cep ? dadosCliente.cep : dadosNoStorage.cep);
    setLogradouro(
      dadosCliente.logradouro
        ? dadosCliente.logradouro
        : dadosNoStorage.logradouro
    );
    setComplemento(
      dadosCliente.complemento
        ? dadosCliente.complemento
        : dadosNoStorage.complemento
    );
    setBairro(
      dadosCliente.bairro ? dadosCliente.bairro : dadosNoStorage.bairro
    );
    setCidade(
      dadosCliente.cidade ? dadosCliente.cidade : dadosNoStorage.cidade
    );
    setEstado(
      dadosCliente.estado ? dadosCliente.estado : dadosNoStorage.estado
    );
  }

  async function cadastraCliente(e, id) {
    e.preventDefault();
    try {
      setErro('');

      const dados = {
        nome,
        email,
        cpf,
        telefone,
        cep,
        logradouro,
        complemento,
        bairro,
        cidade,
        estado,
        status,
      };

      const response = await fetch(
        `https://api-projeto-final.herokuapp.com/clientes/${editarModal ? id : ""
        }`,
        {
          method: `${editarModal ? 'PUT' : 'POST'}`,
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dados),
        }
      );

      const resposta = await response.json();
      if (resposta.erro) {
        console.log(resposta.erro);
        setErro(resposta.erro);
        return;
      }
      setModal(false);
      setDadosCliente(dados);
      carregarRegistros();
    } catch (error) {
      console.log({ error });
    }
  }

  const handleModalClose = () => {
    setModal(false);
    setEditarModal(false);
  };

  return (
    <form
      className={`${classes.root} raiz`}
      noValidate
      autoComplete="off"
      onSubmit={(e) =>
        cadastraCliente(e, window.localStorage.getItem("idCliente"))
      }
    >
      <div className='formulario'>
        <div className='align-Row'>
          <div className='together'>
            <img className='logo' src={iconDados} alt='icon person' />
            <h1 className='titulo'>Cadastro do Cliente</h1>
          </div>
          <img
            className='close'
            src={iconClose}
            alt='icon close'
            onClick={handleModalClose}
          />
        </div>
        <h2 className='nome'>Nome*</h2>
        <TextField
          id='outlined-textarea'
          placeholder='Digite o nome'
          multiline
          variant='outlined'
          className={classes.column}
          onChange={(e) => setNome(e.target.value)}
          value={nome}
          type='text'
          error={erro && erro.includes('nome') ? true : false}
          helperText={erro.includes('nome') ? erro : ''}
        />
        <h2 className='email'>E-mail*</h2>
        <TextField
          id='outlined-textarea'
          placeholder='Digite o E-mail'
          multiline
          variant='outlined'
          className={classes.column}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type='email'
          error={erro && erro.includes('email') ? true : false}
          helperText={erro.includes('email') ? erro : ''}
        />
        <div className='row'>
          <div className='align-double'>
            <h2 className='cpf'>CPF*</h2>
            <TextField
              id='outlined-textarea'
              placeholder='Digite o CPF'
              multiline
              variant='outlined'
              className={`${classes.right} ${classes.spaces}`}
              onChange={(e) => setCpf(e.target.value)}
              value={cpf}
              type='number'
              error={
                (erro && erro.includes('CPF')) || erro.includes('cpf')
                  ? true
                  : false
              }
              helperText={
                erro.includes('CPF') || erro.includes('cpf') ? erro : ''
              }
            />
          </div>
          <div className='align-double'>
            <h2 className='telefone'>Telefone*</h2>
            <TextField
              id='outlined-textarea'
              placeholder='Digite o telefone'
              multiline
              variant='outlined'
              className={classes.spaces}
              onChange={(e) => setTelefone(e.target.value)}
              value={telefone}
              type='number'
              error={erro && erro.includes('telefone') ? true : false}
              helperText={erro.includes('telefone') ? erro : ''}
            />
          </div>
        </div>
        <h2 className='email'>Endereço</h2>
        <TextField
          id='outlined-textarea'
          placeholder='Digite o Endereço'
          multiline
          variant='outlined'
          className={classes.column}
          value={logradouro}
          onChange={(e) => setLogradouro(e.target.value)}
          type='text'
        />
        <h2 className='complemento'>Complemento</h2>
        <TextField
          id='outlined-textarea'
          placeholder='Digite o complemento'
          multiline
          variant='outlined'
          className={classes.column}
          value={complemento}
          onChange={(e) => setComplemento(e.target.value)}
          type='text'
        />
        <div className='row'>
          <div className='align-double'>
            <h2 className='cep'>CEP</h2>
            <TextField
              id='outlined-textarea'
              placeholder='Digite o CEP'
              multiline
              variant='outlined'
              className={`${classes.right} ${classes.spaces}`}
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              type='number'
            />
          </div>
          <div className='align-double'>
            <h2 className='bairro'>Bairro</h2>
            <TextField
              id='outlined-textarea'
              placeholder='Digite o bairro'
              multiline
              variant='outlined'
              className={classes.spaces}
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              type='text'
            />
          </div>
        </div>
        <div className='row'>
          <div className='align-double'>
            <h2 className='cidade'>Cidade</h2>
            <TextField
              id='outlined-textarea'
              placeholder='Digite a Cidade'
              multiline
              variant='outlined'
              className={`${classes.right} ${classes.spaces}`}
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              type='text'
            />
          </div>
          <div className='align-double'>
            <h2 className='uf'>UF</h2>
            <TextField
              id='outlined-textarea'
              placeholder='Digite a UF'
              multiline
              variant='outlined'
              className={classes.spaces}
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              type='text'
            />
          </div>
        </div>
        <h2 className='obs'>
          * Requisitos obrigatórios para cadastrar clientes.
        </h2>
        <div className='row'>
          <div className='align-double'>
            <Button
              variant='contained'
              color='primmary'
              className={`${classes.buttonstyle} ${classes.spaces} ${classes.right}`}
              onClick={handleModalClose}
            >
              Cancelar
            </Button>
          </div>
          <div className='align-double'>
            <Button
              // key={cadastraCliente}
              variant='contained'
              color='secondary'
              className={`${classes.buttonstyle} ${classes.spaces}`}
              type='submit'
            >
              Aplicar
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
