import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";

//Components
import { Modal, ModalHeader, ModalFooter, ModalBody } from "../layout/Modal";

class DeleteRecipe extends Component {
  componentWillReceiveProps(props) {
    const { auth, recipe, history } = props;
    if (recipe && auth.uid !== recipe.user) {
      history.push("/"); // redirect to home if not authorized
    }
  }

  onDelete = () => {
    const { recipe, auth, history, firestore, profile } = this.props;
    const boardId = recipe.board;
    const recipeId = recipe.id;

    //Old board updated deleting the recipe
    const oldBoard = profile.boards.find(boardObj => boardObj.id === boardId);
    const newBoardRecipes = oldBoard.recipes.filter(
      recipeItem => recipeItem !== recipeId
    );
    oldBoard.recipes = newBoardRecipes;

    //User boards updated deleting the recipe
    const userBoards = profile.boards.filter(
      boardObj => boardObj.id !== boardId
    );
    const newUserBoards = [...userBoards, oldBoard];

    //User recipes updated
    const newUserRecipes = profile.recipes.filter(
      recipeItem => recipeItem !== recipeId
    );

    firestore
      .update(
        { collection: "boards", doc: boardId },
        { recipes: newBoardRecipes }
      )
      .then(() => {
        firestore
          .update(
            { collection: "users", doc: auth.uid },
            { boards: newUserBoards, recipes: newUserRecipes }
          )
          .then(() => {
            firestore
              .delete({ collection: "recipes", doc: recipe.id })
              .then(() => history.push("/"));
          });
      });
  };

  render() {
    return (
      <Modal thin>
        <ModalHeader>Êtes vous sûr(e) ?</ModalHeader>
        <ModalBody>
          <div className="p-4 text-lg leading-tight">
            Une fois que vous avez supprimé un tableau, vous ne pouvez pas
            annuler l'opération.
          </div>
        </ModalBody>
        <ModalFooter>
          <Link
            to={`/recipe/${this.props.match.params.recipe}`}
            className="btn sm:ml-auto mb-2 sm:mb-0 sm:mr-2 no-underline"
          >
            Annuler
          </Link>
          <button className="btn btn--accent " onClick={this.onDelete}>
            Supprimer la recette
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

DeleteRecipe.propTypes = {
  firestore: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object,
  recipe: PropTypes.object
};

export default compose(
  firebaseConnect(),
  firestoreConnect(props => [
    {
      collection: "recipes",
      storeAs: "recipe",
      doc: props.match.params.recipe
    }
  ]),
  connect(({ firestore: { ordered }, firebase }, props) => ({
    recipe: ordered.recipe && ordered.recipe[0],
    auth: firebase.auth,
    profile: firebase.profile
  }))
)(DeleteRecipe);
