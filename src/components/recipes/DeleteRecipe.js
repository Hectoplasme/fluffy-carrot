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

class DeleteRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: {},
      recipeExists: true
    };
  }

  componentDidUpdate() {
    const { recipe } = this.state;
    const { profile, history } = this.props;

    //Check if authorized
    if (profile.isLoaded && (!recipe || recipe.user !== profile.slug)) {
      history.push(`/recipe/${this.props.match.params.recipeId}`);
    }
  }

  componentDidMount() {
    const { firestore } = this.props;
    const { recipeExists, recipe } = this.state;

    //check if the recipe exists
    if (!recipe && recipeExists) {
      firestore
        .get({ collection: "recipes", doc: this.props.match.params.recipeId })
        .then(res => {
          this.updaterecipe(res);
        });
    }

    firestore.setListener(
      { collection: "recipes", doc: this.props.match.params.recipeId },
      res => this.updaterecipe(res)
    );
  }

  componentWillUnmount() {
    const { firestore } = this.props;
    firestore.unsetListener(
      { collection: "recipes", doc: this.props.match.params.recipeId },
      res => this.updaterecipe(res)
    );
  }

  updaterecipe(res) {
    if (res.data()) {
      this.setState({ recipe: { id: res.id, ...res.data() } });
    } else {
      this.setState({ recipeExists: false });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { firestore, history, profile } = this.props;
    const { recipe } = this.state;

    firestore
      .delete({ collection: "recipes", doc: recipe.id })
      .then(() => history.push(`/${profile.slug}`));
  };

  render() {
    const { recipe, recipeExists } = this.state;
    const { profile } = this.props;
    if (recipe.id && recipeExists && profile) {
      return (
        <form onSubmit={this.onSubmit}>
          <Modal thin>
            <ModalHeader>Êtes vous sûr(e) ?</ModalHeader>
            <ModalBody>
              <div className="p-4 text-lg leading-tight">
                Une fois que vous avez supprimé une recette, vous ne pouvez pas
                annuler l'opération.
              </div>
            </ModalBody>
            <ModalFooter>
              <Link
                to={`/recipe/${recipe.id}`}
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
    } else if (!recipe && !recipeExists) {
      return <Page404 />;
    } else {
      return (
        <Modal thin>
          <ModalHeader>Êtes vous sûr(e) ?</ModalHeader>
          <ModalBody>
            <Spinner />
          </ModalBody>
        </Modal>
      );
    }
  }
}

DeleteRecipe.propTypes = {
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
)(DeleteRecipe);
