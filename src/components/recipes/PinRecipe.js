import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";

//Components
import { Modal, ModalHeader, ModalBody, ModalFooter } from "../layout/Modal";

class PinRecipe extends Component {
  state = {
    board: "board-new",
    newBoard: "",
    showNewBoardInput: false,
    errors: {},
    loaded: false
  };

  static getDerivedStateFromProps(props, state) {
    const { profile } = props;
    const { loaded } = state;

    if (profile && profile.boards && !loaded) {
      console.log("c'est le problème");
      return {
        board: profile.boards[0] ? profile.boards[0].id : "board-new",
        showNewBoardInput: profile.boards[0] ? false : true,
        loaded: true
      };
    } else {
      return null;
    }
  }

  onChange = e => {
    if (e.target.name == "board" && e.target.value == "board-new") {
      this.setState({
        board: "board-new",
        showNewBoardInput: true
      });
    } else if (e.target.name == "board") {
      this.setState({
        board: e.target.value,
        showNewBoardInput: false,
        newBoard: ""
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const { recipe, firestore, auth, profile, history } = this.props;
    const { board, newBoard, showNewBoardInput } = this.state;
    //check for errors
    const errors = {};

    const regexp = RegExp(/^ *$/); //Test if the string is empty or contain only space

    if (showNewBoardInput && regexp.test(newBoard)) {
      this.setState({
        errors: { board: "Vous n'avez pas choisi de tableau." }
      });
    } else {
      const newRecipe = {
        title: recipe.title,
        description: recipe.description,
        user: auth.uid,
        difficulty: recipe.difficulty,
        time: {
          hours: recipe.time.hours,
          minutes: recipe.time.minutes
        },
        quantity: recipe.quantity,
        keywords: recipe.keywords,
        imgUrl: recipe.imgUrl,
        ustensils: recipe.ustensils,
        ingredients: recipe.ingredients,
        steps: recipe.steps
      };
      if (showNewBoardInput) {
        //Create a new board
        const newBoardObj = { title: newBoard, author: auth.uid };

        firestore.add({ collection: "boards" }, newBoardObj).then(res => {
          //then create the recipe
          const boardId = res.id;

          firestore
            .add({ collection: "recipes" }, { board: boardId, ...newRecipe })
            .then(res => {
              //then update the board with the recipe id
              const recipeId = res.id;
              firestore
                .update(
                  { collection: "boards", doc: boardId },
                  { recipes: [recipeId] }
                )
                .then(() => {
                  //then add the board and the recipe in the user data
                  const newBoardObj = {
                    id: boardId,
                    title: newBoard,
                    recipes: [recipeId]
                  };
                  firestore
                    .update(
                      { collection: "users", doc: auth.uid },
                      {
                        boards: profile.boards
                          ? [...profile.boards, newBoardObj]
                          : [newBoardObj],
                        recipes: profile.recipes
                          ? [...profile.recipes, recipeId]
                          : [recipeId]
                      }
                    )
                    .then(() => history.push(`/recipe/${recipeId}`))
                    .catch(err => console.log(err));
                });
            });
        });
      } else {
        //First create the recipe

        firestore
          .add({ collection: "recipes" }, { board: board, ...newRecipe })
          .then(res => {
            //Then store the recipe id in the board
            const recipeId = res.id;
            const recipes = profile.boards.find(
              boardObj => boardObj.id === board
            ).recipes;

            firestore
              .update(
                { collection: "boards", doc: board },
                { recipes: [...recipes, recipeId] }
              )
              .then(() => {
                //Create a new boards array to update the user data
                const boardUpdated = profile.boards.find(
                  boardObj => boardObj.id === board
                );
                boardUpdated.recipes = [...recipes, recipeId];
                const newBoardsArray = profile.boards.filter(
                  boardObj => boardObj.id !== board
                );
                newBoardsArray.push(boardUpdated);

                //then update the user
                firestore
                  .update(
                    { collection: "users", doc: auth.uid },
                    {
                      boards: newBoardsArray,
                      recipes: profile.recipes
                        ? [...profile.recipes, recipeId]
                        : [recipeId]
                    }
                  )
                  .then(() => history.push(`/recipe/${recipeId}`))
                  .catch(err => console.log(err));
              });
          });
      }
    }
  };

  render() {
    const { profile, recipe } = this.props;
    const { errors, board, newBoard, showNewBoardInput } = this.state;

    if (recipe) {
      return (
        <form onSubmit={this.onSubmit}>
          <Modal thin>
            <ModalHeader>Enregistrer une recette</ModalHeader>
            <ModalBody>
              <label htmlFor="board" className="block font-bold mb-1 text-lg">
                Choisir un tableau
              </label>
              <i className="fas fa-chevron-down absolute pin-r mr-12 mt-6 text-grey-darker" />
              {/* Wait the board list from the profile before render it */}
              {profile.boards && (
                <div>
                  <select
                    name="board"
                    className="w-full p-3 my-2 rounded bg-grey-light font-bold cursor-pointer appearance-none text-dark"
                    value={board}
                    onChange={this.onChange}
                  >
                    {profile.boards
                      ? profile.boards.map((board, i) => (
                          <option key={`board-${i}`} value={board.id}>
                            {board.title}
                          </option>
                        ))
                      : null}
                    <option value="board-new">Créer un nouveau tableau</option>
                  </select>

                  {showNewBoardInput && (
                    <input
                      type="text"
                      name="newBoard"
                      value={newBoard}
                      onChange={this.onChange}
                      placeholder="Titre du nouveau tableau"
                      className={classnames("w-full p-3 my-2 rounded", {
                        hidden: !showNewBoardInput,
                        "border-red border-2": errors.board,
                        "border-grey-dark border": !errors.board
                      })}
                    />
                  )}
                  {errors.board && (
                    <span className="text-red text-sm italic">
                      {errors.board}
                    </span>
                  )}
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Link
                to={`/recipe/${recipe.id}`}
                className="btn ml-auto mr-2 no-underline"
              >
                Annuler
              </Link>
              <button className="btn btn--accent cursor-pointer">
                Enregistrer
              </button>
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
            <Link
              to={`/recipe/${this.props.match.params.id}`}
              className="btn ml-auto mr-2 no-underline"
            >
              Annuler
            </Link>
          </ModalFooter>
        </Modal>
      );
    }
  }
}

PinRecipe.propTypes = {
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
)(PinRecipe);
