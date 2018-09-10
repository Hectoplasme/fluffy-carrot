import React, { Component } from "react";
import { Link } from "react-router-dom";

//Components
import { Modal, ModalHeader, ModalBody } from "../layout/Modal";

class Register extends Component {
  render() {
    return (
      <form>
        <Modal thin>
          <ModalHeader>
            <i className="fas fa-cookie-bite text-purple text-2xl sm:text-4xl align-center mr-4" />
            <span className="text-2xl sm:text-4xl text-purple-darker align-center">
              Fluffy cookie
            </span>
          </ModalHeader>
          <ModalBody>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 my-2 border border-grey-dark rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Créer un mot de passe"
              className="w-full p-3 mb-4 mt-2 border border-grey-dark rounded"
            />
            <div
              className="max-w-xs ml-auto text-right text-xs
            italic text-grey mb-4"
            >
              Cette application étant un prototype, votre adresse email ne sera
              utilisée que pour vous authentifier et ne sera en aucun cas
              revendue ou réutilisée.
            </div>

            <button className="btn btn--accent w-full">S'inscrire</button>

            <div className="max-w-2xs mt-4 ml-auto text-right ">
              Déjà inscrit ?{" "}
              <Link
                to="/login"
                className="no-underline text-purple font-bold hover:text-purple-dark"
              >
                Connectez-vous
              </Link>
            </div>
            <div className="text-center py-8 text-xl font-bold">ou</div>
            <button className="btn btn--accent w-full bg-blue-darker mt-4">
              <i className="fab fa-facebook-f icon align-middle text-xl mr-3" />
              Continuer avec facebook
            </button>

            <button className="btn btn--accent w-full bg-blue mt-4">
              <i className="fab fa-google icon align-middle text-xl mr-3" />
              Continuer avec google
            </button>
          </ModalBody>
        </Modal>
      </form>
    );
  }
}

export default Register;
