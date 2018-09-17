import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";

//redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";

//Components
import Page404 from "../pages/404";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "../layout/Modal";
import Spinner from "../layout/Spinner";

class AddBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      error: ""
    };
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const { firestore, profile, auth, history } = this.props;
    const { title } = this.state;

    //Check for errors
    const regexp = RegExp(/^ *$/); //Test if the string is empty or contain only space
    if (regexp.test(title)) {
      this.setState({
        error: "Vous n'avez pas saisi le nom de votre tableau."
      });
    } else {
      //add the board
      firestore
        .add({ collection: "boards" }, { author: profile.slug, title: title })
        .then(res => {
          //and store it in a subCollection of the user
          const boardId = res.id;
          firestore
            .set(`users/${auth.uid}/boards/${boardId}`, {
              title: title
            })
            .then(() => history.push(`/${profile.slug}/board/${boardId}`))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    const { title, error } = this.state;
    const { profile } = this.props;
    if (profile) {
      return (
        <form onSubmit={this.onSubmit}>
          <Modal thin>
            <ModalHeader>Ajouter un tableau</ModalHeader>
            <ModalBody>
              <div className="p-4">
                <label htmlFor="title" className="block font-bold mb-1 text-lg">
                  Choisir un nom pour votre tableau{" "}
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={this.onChange}
                    placeholder="desserts fruités"
                    className={classnames("w-full p-3 my-2 rounded", {
                      "border-red border-2": error,
                      "border-grey-dark border": !error
                    })}
                  />
                  {error && (
                    <span className="block my-1 p-4 font-normal rounded bg-red-lightest border border-red italic text-sm">
                      {error}
                    </span>
                  )}
                </label>
              </div>
            </ModalBody>
            <ModalFooter>
              <Link
                to={`/${profile.slug}`}
                className="btn mb-2 sm:mb-0 sm:ml-auto sm:mr-2 no-underline"
              >
                Annuler
              </Link>
              <input
                type="submit"
                value="Continuer"
                className="btn btn--accent cursor-pointer"
              />
            </ModalFooter>
          </Modal>
        </form>
      );
    } else {
      return (
        <Modal thin>
          <ModalHeader>Ajouter un tableau?</ModalHeader>
          <ModalBody>
            <Spinner />
          </ModalBody>
        </Modal>
      );
    }
  }
}

AddBoard.propTypes = {
  firestore: PropTypes.object.isRequired,
  profile: PropTypes.object,
  auth: PropTypes.object
};

export default compose(
  firestoreConnect(),
  firebaseConnect(),
  connect(state => ({
    profile: state.firebase.profile,
    auth: state.firebase.auth
  }))
)(AddBoard);
