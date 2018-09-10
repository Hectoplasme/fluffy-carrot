import React, { Component } from "react";
import { Link } from "react-router-dom";

//Components
import { Modal, ModalHeader, ModalFooter, ModalBody } from "../layout/Modal";

class AddRecipe extends Component {
  render() {
    return (
      <form>
        <Modal>
          <ModalHeader>Créer une recette</ModalHeader>
          <ModalBody>
            <div className="md:flex  border-b border-grey-lighter">
              <div className="flex md:inline-flex items-center justify-center md:w-1/2 mx-0 p-4">
                {/* <img
                src="https://picsum.photos/600/800/?random"
                className="bg-grey-light rounded-lg"
              /> */}
                {/* @todo get the file and display it */}
                <input
                  name="file"
                  type="file"
                  ref={ref => (this.upload = ref)}
                  style={{ display: "none" }}
                />
                <div
                  className="flex flex-col items-align justify-center h-96 p-12 border-2 border-dashed border-grey-darker rounded-lg text-center cursor-pointer"
                  onClick={e => this.upload.click()}
                >
                  <i className="fas fa-camera mb-4 text-4xl" />
                  <span className="font-bold text-lg">Ajouter une image</span>
                </div>
              </div>
              <div className="md:w-1/2 mx-0 p-4">
                {/* @field Board */}
                <div className="mb-4 pb-8 border-b- border-grey-lighter">
                  <label
                    htmlFor="board"
                    className="block font-bold mb-1 text-lg"
                  >
                    Tableau
                  </label>
                  <i className="fas fa-chevron-down absolute pin-r mr-12 mt-6 text-grey-darker" />
                  <select
                    name="board"
                    className="w-full p-3 my-2 rounded bg-grey-light font-bold cursor-pointer appearance-none text-dark"
                  >
                    <option value="board-1">Recette de pâtes</option>
                    <option value="board-2">Recette de risotto</option>
                    <option value="board-new">Créer un nouveau tableau</option>
                  </select>
                  <input
                    type="text"
                    name="board-new"
                    placeholder="Titre du nouveau tableau"
                    className="w-full p-3 my-2 border border-grey-dark rounded"
                  />
                </div>
                {/* @field Title */}
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block font-bold mb-1 text-lg"
                  >
                    Titre de la recette
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Risotto au poulet"
                    className="w-full p-3 my-2 border border-grey-dark rounded"
                  />
                </div>
                {/* @field description */}
                <div className="mb-4  border-b border-grey-lighter">
                  <label
                    htmlFor="description"
                    className="block font-bold mb-1 text-lg"
                  >
                    Description de la recette
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    placeholder="Donnez un avant goût de votre recette, racontez son histoire"
                    className="w-full h-32 p-3 my-2 border border-grey-dark rounded resize-none"
                  />
                </div>

                {/* @field Difficulty */}
                <div className="mb-4">
                  <label
                    htmlFor="difficulty"
                    className="block font-bold mb-1 text-lg"
                  >
                    Difficulté
                  </label>
                  <i className="fas fa-chevron-down absolute pin-r mr-12 mt-6 text-grey-darker" />
                  <select
                    name="difficulty"
                    className="w-full p-3 my-2 rounded bg-grey-light font-bold cursor-pointer appearance-none text-dark"
                  >
                    <option value="very-easy">Très facile</option>
                    <option value="easy">Facile</option>
                    <option value="medium">Moyenne</option>
                    <option value="hard">Difficile</option>
                  </select>
                </div>
                {/* @field Time */}
                <div className="mb-4">
                  <label className="block font-bold mb-1 text-lg">
                    Temps de préparation
                  </label>
                  <input
                    type="number"
                    name="time-hour"
                    placeholder="x"
                    className="inline-block w-12 py-3 px-3 my-2 mr-2 border border-grey-dark rounded text-center"
                  />
                  heures
                  <br className="sm:hidden" />
                  <input
                    type="number"
                    name="time-minute"
                    placeholder="x"
                    className="inline-block w-12 py-3 px-3 my-2 mr-2 sm:ml-2 border border-grey-dark rounded text-center"
                  />
                  minutes
                </div>
                {/* @field quantity */}
                <div>
                  <label
                    htmlFor="quantity"
                    className="block font-bold mb-1 text-lg"
                  >
                    Nombres de portions
                  </label>
                  Pour
                  <input
                    type="number"
                    name="quantity"
                    placeholder="x"
                    className="inline-block w-12 py-3 px-3 my-2 mx-2 border border-grey-dark rounded text-center"
                  />
                  personnes
                </div>
              </div>
            </div>
            {/* @field ingredients
            @Todo handle the add ingredients */}
            <div className="p-4 px-4 md:px-8 mt-4">
              <label className="block font-bold mb-1 text-lg">
                Ingrédient(s)
              </label>
              <div className="inline-block mx-0">
                <input
                  type="text"
                  placeholder="5 cuillères à soupe"
                  className="inline-block w-full sm:w-48 p-3 my-2 mr-2 border border-grey-dark rounded"
                />
                <span className="mr-2">de</span>
                <input
                  type="text"
                  placeholder="sucre"
                  className="inline-block w-full sm:w-48 p-3 my-2 mr-2 border border-grey-dark rounded"
                />
              </div>
              <button className="w-full md:w-auto block md:inline-block mt-2 font-bold btn">
                <i className="fas fa-plus icon" />
                Ajouter un ingrédient
              </button>
            </div>
            {/* @field ustensils
            @Todo handle add ustensils */}
            <div className="pt-4 pb-8 px-4 md:px-8  border-b border-grey-lighter">
              <label className="block font-bold mb-1 text-lg">
                Ustensile(s)
              </label>
              <input
                type="text"
                placeholder="Micro-onde"
                className="inline-block w-full sm:w-48 p-3 my-2 mr-2 border border-grey-dark rounded"
              />
              <button className="w-full md:w-auto block md:inline-block mt-2 font-bold btn">
                <i className="fas fa-plus icon" />
                Ajouter un ustensile
              </button>
            </div>
            {/* @field steps
            @todo handle add steps */}
            <div className="p-4 py-8 md:px-8 border-b border-grey-lighter">
              <label className="block font-bold mb-4 text-lg">
                Etapes de la préparation
              </label>
              <div className="mb-2">
                Etape n°1
                <textarea
                  type="text"
                  name="description"
                  placeholder="Coupez les oignons"
                  className="w-full h-32 p-3 my-2 border border-grey-dark rounded resize-none"
                />
              </div>
              <button className="w-full sm:w-auto ml-auto block mt-2 font-bold btn">
                <i className="fas fa-plus icon" />
                Ajouter une étape
              </button>
            </div>
            {/* @field tags */}
            <div className="mb-4 pt-8 px-4 md:px-8">
              <label htmlFor="tag" className="block font-bold mb-2 text-lg">
                Mots clés <span className="font-normal">(facultatif)</span>
              </label>
              <div className="italic mb-4">Séparer par des virgules</div>
              <input
                type="text"
                name="title"
                placeholder="poulet, entrée, risotto"
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
      </form>
    );
  }
}

export default AddRecipe;
