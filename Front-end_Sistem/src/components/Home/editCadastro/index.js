import "./styles.css";
import logoBotaoFechar from "../../../assets/icones_home/logoBotaoFechar.svg";
import logoConfirmacao from "../../../assets/icones_home/logoConfirmacao.svg";
import { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

function ModalEdit({ open, setOpen, setLoadInfo, loadInfo }) {
  const listaDeInfo = {
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    senha: "",
    senhaConfirmada: "",
    showPassword: false,
    showPassword2: false,
  };

  const [form, setForm] = useState(listaDeInfo);
  const [erro, setErro] = useState();

  function pegaState() {
    if (loadInfo) {
      setForm({
        nome: loadInfo.nome,
        email: loadInfo.email,
        cpf: loadInfo.cpf,
        telefone: loadInfo.telefone,
        senha: loadInfo.senha,
        senhaConfirmada: loadInfo.senhaConfirmada,
      });
    }
  }

  useEffect(() => {
    pegaState();
  }, []);

  function handleChangeLista(target) {
    setForm({ ...form, [target.name]: target.value });
  }

  const handleClickShowPassword = () => {
    setForm({ ...form, showPassword: !form.showPassword });
  };

  const handleClickShowPassword2 = () => {
    setForm({ ...form, showPassword2: !form.showPassword2 });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const [abrirConfirmacao, setAbrirConfirmacao] = useState(false);

  async function editarCliente(e) {
    e.preventDefault();
    setErro('');
    try {
      const body = {
        nome: form.nome,
        email: form.email,
        cpf: form.cpf,
        telefone: form.telefone,
        senha: form.senha,
        senhaConfirmada: form.senhaConfirmada,
      };

      // if (!body.nome) {
      //   alert("O campo nome deve ser preenchido");
      //   return;
      // }

      // if (!body.email) {
      //   alert("O campo email deve ser preenchido");
      //   return;
      // }

      if (body.senha) {
        if (body.senha !== form.senhaConfirmada) {
          setErro("As senhas não coincidem");
          return;
        }
      }

      const response = await fetch(
        "https://api-projeto-final.herokuapp.com/usuario",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const resposta = await response.json();
      if (resposta.erro) {
        setErro(resposta.erro);
        return
      }
      setAbrirConfirmacao(true);
      setTimeout(() => {
        setOpen(false);
        setAbrirConfirmacao(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      return;
    }
  }
  return (
    <>
      <div className="editCad-fundo-tela" style={{ display: !open && "none" }}>
        <div className="editCad-modal-conteudo">
          <button className="editCad-close-icone-button">
            <img
              src={logoBotaoFechar}
              alt="logoBotaoFechar"
              className="editCad-close-icone"
              onClick={() => setOpen(false)}
            />
          </button>
          <h2 className="editCad-close-icone-h2">Edite seu cadastro</h2>
          <form className="editCad-form" onSubmit={editarCliente}>
            <div className="editCad-conteiner-inputs editCad-nome">
              <label className="editCad-label">Nome*</label>
              <input
                className={erro && erro.includes('nome') ? 'editCad-inputs erro-input' : 'editCad-inputs'}
                type="text"
                placeholder=" Digite seu nome"
                onChange={(event) => handleChangeLista(event.target)}
                name="nome"
                value={form.nome}
              // style={erro && erro.includes('nome') && { border: 'red' }}
              ></input>
              {erro && erro.includes('nome') && <div className='erro'>{erro}</div>}
            </div>
            <div className="editCad-conteiner-inputs">
              <label className="editCad-label">E-mail*</label>
              <input
                className={erro && erro.includes('email') ? 'editCad-inputs erro-input' : 'editCad-inputs'}
                type="email"
                placeholder=" Digite seu e-mail"
                onChange={(event) => handleChangeLista(event.target)}
                name="email"
                value={form.email}
              ></input>
              {erro && erro.includes('email') && <div className='erro'>{erro}</div>}
            </div>
            <div className="editCad-conteiner-inputs-cpf-telefone">
              <div className="editCad-conteiner-inputs">
                <label className="editCad-label">CPF</label>
                <input
                  className={erro && erro.includes('cpf') ? 'editCad-inputs erro-input' : 'editCad-inputs'}
                  type="number"
                  placeholder=" Digite seu CPF"
                  onChange={(event) => handleChangeLista(event.target)}
                  name="cpf"
                  value={form.cpf}
                ></input>
                {erro && erro.includes('cpf') && <div className='erro'>{erro}</div>}
              </div>
              <div className="editCad-conteiner-inputs">
                <label className="editCad-label">Telefone</label>
                <input
                  className={erro && erro.includes('telefone') ? 'editCad-inputs erro-input' : 'editCad-inputs'}
                  type="number"
                  placeholder=" Digite seu Telefone"
                  onChange={(event) => handleChangeLista(event.target)}
                  name="telefone"
                  value={form.telefone}
                ></input>
                {erro && erro.includes('telefone') && <div className='erro'>{erro}</div>}
              </div>

            </div>
            <div className="editCad-conteiner-inputs">
              <label className="editCad-label">Nova senha*</label>
              <OutlinedInput
                className={erro && erro.includes('senhas') ? 'editCad-inputs erro-input' : 'editCad-inputs'}
                id="outlined-adornment-password"
                type={form.showPassword ? "text" : "password"}
                value={form.senha}
                name="senha"
                onChange={(event) => handleChangeLista(event.target)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {form.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
            <div className="editCad-conteiner-inputs">
              <label className="editCad-inputs-label">Confirmar senha*</label>
              <OutlinedInput
                className={erro && erro.includes('senhas') ? 'editCad-inputs erro-input' : 'editCad-inputs'}
                id="outlined-adornment-password2"
                type={form.showPassword2 ? "text" : "password"}
                value={form.senhaConfirmada}
                name="senhaConfirmada"
                onChange={(event) => handleChangeLista(event.target)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword2}
                      onMouseDown={handleMouseDownPassword2}
                      edge="end"
                    >
                      {form.showPassword2 ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {erro && erro.includes('senhas') && <div className='erro'>{erro}</div>}
            </div>
            <div className="editCad-conteiner-icone-aplicar">
              <button
                className="editCad-conteiner-icone-aplicar-btn"
                type="submit"
              // onClick={() => editarCliente()}
              // onClick={() => setAbrirConfirmacao(true)}
              >
                Aplicar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className="editCad-fundo-tela"
        style={{ display: !abrirConfirmacao && "none" }}
      >
        <div className="editCad-modal-conteudo editCad-modal-confirmacao">
          <div className="editCad-logoDeConfirmacao">
            <img
              src={logoConfirmacao}
              alt="logo de confirmação"
              className="editCad-logoDeConfirmacao-img"
            />
          </div>
          <h2 className="editCad-modal-confirmacao-h2">
            Cadastro Alterado com Sucesso
          </h2>
        </div>
      </div>
    </>
  );
}

export default ModalEdit;
