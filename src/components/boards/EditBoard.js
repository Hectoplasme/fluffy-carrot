import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";

//Components
import Page404 from "../pages/404";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "../layout/Modal";
import Spinner from "../layout/Spinner";

class EditBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: {},
      boardExists: true,
      error: ""
    };

    this.titleInput = React.createRef();
  }

  componentDidUpdate() {
    const { board } = this.state;
    const { profile, history } = this.props;

    //Check if authorized
    if (profile.isLoaded && (!board || board.author !== profile.slug)) {
      history.push(`/${profile.slug}/board/${this.props.match.params.boardId}`);
    }
  }

  componentDidMount() {
    const { firestore } = this.props;
    const { boardExists, board } = this.state;

    //check if the board exists
    if (!board && boardExists) {
      firestore
        .get({ collection: "boards", doc: this.props.match.params.boardId })
        .then(res => {
          this.updateBoard(res);
        });
    }

    firestore.setListener(
      { collection: "boards", doc: this.props.match.params.boardId },
      res => this.updateBoard(res)
    );
  }

  componentWillUnmount() {
    const { firestore } = this.props;
    firestore.unsetListener(
      { collection: "boards", doc: this.props.match.params.boardId },
      res => this.updateBoard(res)
    );
  }

  updateBoard(res) {
    if (res.data()) {
      this.setState({ board: { id: res.id, ...res.data() } });
    } else {
      this.setState({ boardExists: false });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { board } = this.state;
    const { firestore, history } = this.props;
    //check for errors
    const regexp = RegExp(/^ *$/); //Test if the string is empty or contain only space

    if (regexp.test(this.titleInput.current.value)) {
      this.setState({ error: "vous n'avez pas saisi de titre" });
    } else {
      firestore
        .update(
          { collection: "boards", doc: board.id },
          { title: this.titleInput.current.value }
        )
        .then(() => history.push(`/${board.author}/board/${board.id}`));
    }
  };

  render() {
    const { board, boardExists, error } = this.state;
    const { profile } = this.props;
    if (board.id && boardExists && profile) {
      return (
        <form onSubmit={this.onSubmit}>
          <Modal thin>
            <ModalHeader>Modifier un tableau</ModalHeader>
            <ModalBody>
              <label htmlFor="title" className="block font-bold mb-1 text-lg">
                Titre du tableau:{" "}
                <input
                  type="text"
                  name="name"
                  placeholder="Chocolat à volonté"
                  defaultValue={board.title}
                  ref={this.titleInput}
                  className={classnames("w-full p-3 my-2 rounded", {
                    "border-red border-2": error,
                    "border-grey-dark border": !error
                  })}
                />
              </label>
              {error && (
                <span className="block my-1 p-4 font-normal rounded bg-red-lightest border border-red italic text-sm">
                  {error}
                </span>
              )}
            </ModalBody>
            <ModalFooter>
              <Link
                to={`/board/delete/${board.id}`}
                className="btn mb-2 sm:mb-0 sm:mr-auto sm:mr-2 no-underline"
              >
                Supprimer
              </Link>
              <Link
                to={`/${profile.slug}/board/${board.id}`}
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
    } else if (!board && !boardExists) {
      return <Page404 />;
    } else {
      return (
        <Modal thin>
          <ModalHeader>Modifier un tableau</ModalHeader>
          <ModalBody>
            <Spinner />
          </ModalBody>
        </Modal>
      );
    }
  }
}

EditBoard.propTypes = {
  firestore: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  profile: PropTypes.object
};

export default compose(
  firestoreConnect(),
  firebaseConnect(),
  connect(({ firebase }) => ({
    profile: firebase.profile
  }))
)(EditBoard);
