import React, { Component } from "react";

//CSS
import "../Modals.css";
import "./AddModal.css";

//Component
import Modal from "../Modal";

class AddModal extends Component {
  render() {
    return (
      <Modal
        heading="Créer une épingle"
        footer={[
          {
            name: "Supprimer",
            action: () => {
              console.log("delete the recipe");
            }
          },
          {
            name: "Annuler",
            accent: false,
            position: "right",
            action: () => {
              console.log("close the modal");
            }
          },
          {
            name: "Enregistrer",
            accent: true,
            position: "right",
            action: () => {
              console.log("save the recipe");
            }
          }
        ]}
      >
        test
      </Modal>
    );
  }
}

export default AddModal;
