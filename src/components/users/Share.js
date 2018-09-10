import React, { Component } from "react";
import { Link } from "react-router-dom";

//Components
import { Modal, ModalHeader, ModalFooter, ModalBody } from "../layout/Modal";

class Share extends Component {
  render() {
    return (
      <Modal thin>
        <ModalHeader>Partager</ModalHeader>
        <ModalBody>
          <div className="p-4 flex flex-wrap justify-center">
            <Link
              to="/"
              className="btn-floating my-2 mr-2 text-white bg-blue-darker hover:bg-blue-darkest"
            >
              <i className="fab fa-facebook-f icon" />
            </Link>
            <Link
              to="/"
              className="btn-floating my-2 mr-2 text-white bg-blue-dark hover:bg-blue-darker"
            >
              <i className="fab fa-facebook-messenger text-4xl icon" />
            </Link>
            <Link
              to="/"
              className="btn-floating my-2 mr-2 text-white bg-blue-light hover:bg-blue"
            >
              <i className="fab fa-twitter icon" />
            </Link>
            <Link
              to="/"
              className="btn-floating my-2 mr-2 text-white bg-green-light hover:bg-green"
            >
              <i className="fab fa-whatsapp icon text-4xl" />
            </Link>
            <Link
              to="/"
              className="btn-floating my-2 mr-2 bg-grey-lighter hover:bg-grey-light hover:text-grey-darker "
            >
              <i className="fas fa-envelope icon" />
            </Link>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn sm:ml-auto mb-2 sm:mb-0 sm:my-2 mr-2">
            Annuler
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default Share;
