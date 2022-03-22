import "./Styles.css";
import { useContext } from "react";
import NavBar from "../Navbar/index.js";
import Header from "../Header/index.js";
import CobrancasTotais from "../Home/cobrancas_totais/index.js";
import CobrancasDetalhadas from "../Home/cobrancas_detalhadas/index.js";
import ClientesInadENao from "../Home/clientesInadOuNao/index.js";
import ModalEdit from "../Home/editCadastro/index.js";
import UserContext from "../../contexts/userContext";

export default function Main() {
  const {
    show,
    setShow,
    open,
    setOpen,
    loadInfo,
    setLoadInfo,
    openModalConfirmacao,
    setOpenModalConfirmacao,
    token
  } = useContext(UserContext);


  return (
    <div className="App">
      <NavBar />
      <main className="main">
        <Header
          show={show}
          setShow={setShow}
          open={open}
          setOpen={setOpen}
          loadInfo={loadInfo}
          setLoadInfo={setLoadInfo}
        />
        <CobrancasTotais />
        <CobrancasDetalhadas />
        <ClientesInadENao />
      </main>
      {open && (
        <ModalEdit
          open={open}
          setOpen={setOpen}
          loadInfo={loadInfo}
          setLoadInfo={setLoadInfo}
          openModalConfirmacao={openModalConfirmacao}
          setOpenModalConfirmacao={setOpenModalConfirmacao}
        />
      )}
    </div>
  );
}
