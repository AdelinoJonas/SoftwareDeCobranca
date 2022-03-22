import Modal from "@material-ui/core/Modal";
import React, { useContext } from "react";
import UserContext from "../../contexts/userContext";
import useStyles from "./styles.js";
import MultilineTextFields from "../CadastroCliente";

export default function TransitionsModal() {
  const classes = useStyles();
  const { modal, setModal, editarModal, setEditarModal } =
    useContext(UserContext);

  const handleModalClose = () => {
    setModal(false);
    setEditarModal(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modal}
        onClose={handleModalClose}
      >
        <div className={classes.paper}>
          <MultilineTextFields />
        </div>
      </Modal>
    </div>
  );
}
