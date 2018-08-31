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
              <div className="input-field border-bottom">
                <label className="label">
                  Titre de la recette
                  <input
                    type="text"
                    className="input"
                    placeholder="Recette de pâtes"
                  />
                </label>
                <label className="label">
                  Description de la recette
                  <textarea
                    type="text"
                    className="textarea"
                    placeholder="Donnez un avant goût de votre recette, racontez son histoire"
                  />
                </label>
              </div>
              <div className="input-field">
                <label className="label">
                  <div className="modal-form-title bold">Difficulté</div>
                  <select className="dropdown">
                    <option className="dropdown-item" value="very-easy">
                      Très facile
                    </option>
                    <option className="dropdown-item" value="easy">
                      Facile
                    </option>
                    <option className="dropdown-item" value="medium">
                      Moyenne
                    </option>
                    <option className="dropdown-item" value="hard">
                      Difficile
                    </option>
                  </select>
                </label>
                <label className="label">
                  <div className="modal-form-title bold">
                    Temps de préparation
                  </div>
                  <input
                    type="number"
                    className="input input--number"
                    placeholder="x"
                  />
                  heures
                  <input
                    type="number"
                    className="input input--number"
                    placeholder="x"
                  />
                  minutes
                </label>
                <label className="label">
                  <div className="modal-form-title bold">
                    Nombres de portions
                  </div>
                  Pour
                  <input
                    type="number"
                    className="input input--number"
                    placeholder="x"
                  />
                  personnes
                </label>
              </div>
            </form>
          </div>
        </div>

        <div className="add-modal-fw border-top border-bottom">
          <div className="input-field">
            <div className="modal-form-title bold">Ingrédient(s)</div>
            <label className="label">
              <input
                type="text"
                className="input input--inline"
                placeholder="5 cuillères à soupe "
              />
              de
              <input
                type="text"
                className="input input--inline"
                placeholder="sucre"
              />
              <button className="btn btn-floating">
                <i className="icon icon-accent icon-large fas fa-plus-circle" />
              </button>
            </label>
          </div>
          <div className="input-field">
            <div className="modal-form-title bold">Materiel(s)</div>
            <label className="label">
              <input
                type="text"
                className="input input--inline"
                placeholder="Micro-onde"
              />
              <button className="btn btn-floating">
                <i className="icon icon-accent icon-large fas fa-plus-circle" />
              </button>
            </label>
          </div>
        </div>
        <div className="add-modal-fw">
          <div className="input-field">
            <div className="modal-form-title bold">
              Etapes de la préparation
            </div>
            <label className="label">
              Etape n°1
              <textarea
                type="text"
                className="textarea"
                placeholder="Coupez les oignons"
              />
            </label>
            <div className="add-step-btn">
              Ajouter une étape
              <button className="btn btn-floating">
                <i className="icon icon-accent icon-large fas fa-plus-circle" />
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default AddModal;
