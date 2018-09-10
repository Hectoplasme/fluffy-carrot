import React, { Component } from "react";

//Components
import { Modal, ModalHeader, ModalFooter, ModalBody } from "../layout/Modal";

class EditRecipe extends Component {
  render() {
    return (
      <Modal>
        <ModalHeader>Editer une recette</ModalHeader>
        <ModalBody>Edit recipe</ModalBody>
        <ModalFooter>
          <button className="btn mr-2">Supprimer</button>
          <button className="btn ml-auto mr-2">Annuler</button>
          <button className="btn btn--accent ">Enregistrer</button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default EditRecipe;
