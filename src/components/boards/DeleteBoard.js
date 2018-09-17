import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";

//Components
import Page404 from "../pages/404";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "../layout/Modal";
import Spinner from "../layout/Spinner";

class DeleteBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: {},
      boardExists: true
    };
  }

  componentDidUpdate() {
    const { board } = this.state;
    const { profile, history } = this.props;

    //Check if authorized
    if (profile.isLoaded && (!board || board.author !== profile.slug)) {
      history.push(`${profile.slug}/board/${this.props.match.params.boardId}`);
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
          this.updateboard(res);
        });
    }

    firestore.setListener(
      { collection: "boards", doc: this.props.match.params.boardId },
      res => this.updateboard(res)
    );
  }

  componentWillUnmount() {
    const { firestore } = this.props;
    firestore.unsetListener(
      { collection: "boards", doc: this.props.match.params.boardId },
      res => this.updateboard(res)
    );
  }

  updateboard(res) {
    if (res.data()) {
      this.setState({ board: { id: res.id, ...res.data() } });
    } else {
      this.setState({ boardExists: false });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { firestore, history, profile, auth } = this.props;
    const { board } = this.state;
    const boardId = board.id;

    //Delete the recipes and the board
    firestore
      .get({ collection: "recipes", where: [["board", "==", board.id]] })
      .then(res => {
        const batch = firestore.batch();
        if (res.docs) {
          res.docs.forEach(doc => {
            batch.delete(doc.ref);
          });

          return batch.commit().catch(err => console.log(err));
        }
      })
      .then(() => {
        firestore
          .delete(`users/${auth.uid}/boards/${boardId}`)
          .then(() => {
            firestore
              .delete({ collection: "boards", doc: boardId })
              .then(() => {
                history.push(`/${profile.slug}`);
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  render() {
    const { board, boardExists } = this.state;
    const { profile } = this.props;
    if (board.id && boardExists && profile) {
      return (
        <form onSubmit={this.onSubmit}>
          <Modal thin>
            <ModalHeader>Êtes vous sûr(e) de sûr(e)?</ModalHeader>
            <ModalBody>
              <div className="p-4 text-lg leading-tight">
                Une fois que vous avez supprimé un tableau, toutes ses recettes
                seront supprimées définitivement et vous ne pouvez pas annuler
                l'opération.
              </div>
            </ModalBody>
            <ModalFooter>
              <Link
                to={`${profile.slug}/board/${board.id}`}
                className="btn sm:ml-auto mb-2 sm:mb-0 sm:mr-2 no-underline"
              >
                Annuler
              </Link>
              <input
                type="submit"
                className="btn btn--accent cursor-pointer"
                value="Continuer"
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
          <ModalHeader>Êtes vous sûr(e) de sûr(e)?</ModalHeader>
          <ModalBody>
            <Spinner />
          </ModalBody>
        </Modal>
      );
    }
  }
}

DeleteBoard.propTypes = {
  firestore: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  profile: PropTypes.object,
  auth: PropTypes.object
};

export default compose(
  firestoreConnect(),
  firebaseConnect(),
  connect(({ firebase }) => ({
    profile: firebase.profile,
    auth: firebase.auth
  }))
)(DeleteBoard);
