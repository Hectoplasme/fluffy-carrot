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
        heading="Créer une recette"
        footer={[
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
        <div className="add-modal-inner">
          <div className="add-modal-left">
            <button className="modal-img-upload">
              <i className="icon icon-large fas fa-camera" />
              <p className="text bold">Choisir une image</p>
            </button>
          </div>
          <div className="add-modal-right">
            <form className="form">
              <div className="input-field">
                <label htmlFor="name" className="label">
                  Titre de la recette
                  <input
                    type="text"
                    className="input"
                    placeholder="Recette de pâtes"
                  />
                </label>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}

export default AddModal;
