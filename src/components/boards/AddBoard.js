import React, { Component } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

//Components
import { Modal, ModalHeader, ModalFooter, ModalBody } from "../layout/Modal";

class AddBoard extends Component {
  state = {
    title: "",
    errors: {}
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { title } = this.state;
    const { profile, firestore, auth, history } = this.props;

    //check for errors
    const regexp = RegExp(/^ *$/); //Test if the string is empty or contain only space

    if (regexp.test(title)) {
      this.setState({
        errors: { title: "Vous n'avez pas saisi de titre pour votre tableau." }
      });
    } else {
      const newBoardObj = { title: title, author: auth.uid };
      //first create the new board
      firestore.add({ collection: "boards" }, newBoardObj).then(res => {
        //then store it in the user profile
        const boardId = res.id;
        const boardObj = { id: boardId, newBoardObj };
        const newUserBoards = [...profile.boards, boardObj];

        firestore
          .update(
            { collection: "users", doc: auth.uid },
            { boards: newUserBoards }
          )
          .then(() => history.push(`/board/${boardId}`));
      });
    }
  };

  render() {
    const { title, errors } = this.state;
    const { profile } = this.props;
    if (profile) {
      return (
        <form onSubmit={this.onSubmit}>
          <Modal>
            <ModalHeader>Ajouter un tableau</ModalHeader>
            <ModalBody>
              <div className="p-4">
                <label htmlFor="title" className="block font-bold mb-1 text-lg">
                  Titre du tableau
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={this.onChange}
                  name="title"
                  placeholder="Desserts fruités"
                  className={classnames("w-full p-3 my-2 rounded", {
                    "border-red border-2": errors.title,
                    "border-grey-dark border": !errors.title
                  })}
                />
                {errors.title && (
                  <span className="text-red text-sm italic">
                    {errors.title}
                  </span>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Link
                to={`/${profile.slug}`}
                className="btn mb-2 sm:mb-0 sm:ml-auto sm:mr-2 no-underline"
              >
                Annuler
              </Link>
              <button className="btn btn--accent ">Enregistrer</button>
            </ModalFooter>
          </Modal>
        </form>
      );
    } else {
      return (
        <Modal thin>
          <ModalHeader>Enregistrer une recette</ModalHeader>
          <ModalBody />
          <ModalFooter>
            <Link to={`/`} className="btn ml-auto mr-2 no-underline">
              Annuler
            </Link>
          </ModalFooter>
        </Modal>
      );
    }
  }
}

AddBoard.propTypes = {
  firebase: PropTypes.object.isRequired,
  profile: PropTypes.object,
  auth: PropTypes.object
};

export default compose(
  firestoreConnect(),
  connect(state => ({
    profile: state.firebase.profile,
    auth: state.firebase.auth
  }))
)(AddBoard);
