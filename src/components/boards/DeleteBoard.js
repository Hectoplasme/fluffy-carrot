import React, { Component } from "react";

//Components
import { Modal, ModalHeader, ModalFooter, ModalBody } from "../layout/Modal";

class DeleteBoard extends Component {
  render() {
    return (
      <Modal thin>
        <ModalHeader>Êtes vous sûr(e) ?</ModalHeader>
        <ModalBody>
          <div className="p-4 text-lg leading-tight">
            Une fois que vous avez supprimé un tableau, vous ne pouvez pas
            annuler l'opération.
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn sm:ml-auto mb-2 sm:mb-0 sm:mr-2">
            Annuler
          </button>
          <button className="btn btn--accent ">Supprimer le tableau</button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default DeleteBoard;
