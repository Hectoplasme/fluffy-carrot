import React, { Component } from "react";

//Components
import { Modal, ModalHeader, ModalFooter, ModalBody } from "../layout/Modal";

class AddBoard extends Component {
  render() {
    return (
      <Modal>
        <ModalHeader>Ajouter un tableau</ModalHeader>
        <ModalBody>
          <div className="p-4">
            <label htmlFor="title" className="block font-bold mb-1 text-lg">
              Titre du tableau
            </label>
            <input
              type="text"
              name="title"
              placeholder="Desserts fruités"
              className="w-full p-3 my-2 border border-grey-dark rounded"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn mb-2 sm:mb-0 sm:ml-auto sm:mr-2">
            Annuler
          </button>
          <button className="btn btn--accent ">Enregistrer</button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AddBoard;
