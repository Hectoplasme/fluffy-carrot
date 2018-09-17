import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classnames from "classnames";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect, firestoreConnect } from "react-redux-firebase";

//Components
import Page404 from "../pages/404";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "../layout/Modal";
import Spinner from "../layout/Spinner";

class PinRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      recipeExists: true,
      board: "board-new",
      newBoard: "",
      showNewBoard: true,
      userBoards: [],
      userBoardsLoaded: false,
      error: ""
    };
  }
  componentDidMount() {
    const { firestore, auth } = this.props;
    const { userBoardsLoaded, recipe, recipeExists } = this.state;

    //Get the user boards
    if (auth && !userBoardsLoaded) {
      firestore.get(`users/${auth.uid}/boards`).then(res => {
        if (res.docs) {
          const userBoards = [];
          res.docs.forEach(board => {
            userBoards.push({
              id: board.id,
              ...board.data()
            });
          });
          this.setState({
            board: userBoards[0].id,
            showNewBoard: false,
            userBoards,
            userBoardsLoaded: true
          });
        }
      });
    }

    if (!recipe && recipeExists) {
      firestore
        .get({ collection: "recipes", doc: this.props.match.params.recipeId })
        .then(res => {
          this.updateRecipe(res);
        });
    }

    //get the recipe and listen the change
    firestore.setListener(
      { collection: "recipes", doc: this.props.match.params.recipeId },
      res => this.updateRecipe(res)
    );
  }

  componentWillUnmount() {
    const { firestore } = this.props;

    firestore.unsetListener(
      { collection: "recipes", doc: this.props.match.params.recipeId },
      res => this.updateRecipe(res)
    );
  }

  updateRecipe = res => {
    if (res.data()) {
      this.setState({ recipe: { id: res.id, ...res.data() } });
    } else {
      this.setState({ recipeExists: false });
    }
  };

  onChange = e => {
    const { showNewBoard } = this.state;
    if (e.target.name === "board" && e.target.value == "board-new") {
      this.setState({ showNewBoard: true, board: e.target.value });
    } else if (
      e.target.name === "board" &&
      e.target.value != "board-new" &&
      showNewBoard
    ) {
      this.setState({
        showNewBoard: false,
        board: e.target.value,
        newBoard: ""
      });
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { firestore, profile, auth, history } = this.props;
    const { board, newBoard, showNewBoard, recipe } = this.state;
    //Check for errors
    const regexp = RegExp(/^ *$/); //Test if the string is empty or contain only space

    if (showNewBoard && regexp.test(newBoard)) {
      this.setState({ error: "Vous n'avez pas choisi de tableau" });
    } else {
      const newRecipe = {
        user: profile.slug,
        imgUrl: recipe.imgUrl,
        title: recipe.title,
        description: recipe.description,
        difficulty: recipe.difficulty,
        time: { hours: recipe.time.hours, minutes: recipe.time.minutes },
        quantity: recipe.quantity,
        ingredients: recipe.ingredients,
        ustensils: recipe.ustensils,
        steps: recipe.steps,
        keywords: recipe.keywords ? recipe.keywords : []
      };

      if (showNewBoard) {
        //   //If the board doesn't exist yet
        //   //add the board
        firestore
          .add(
            { collection: "boards" },
            { author: profile.slug, title: newBoard }
          )
          .then(res => {
            //and store it in a subCollection of the user
            const boardId = res.id;
            firestore
              .set(`users/${auth.uid}/boards/${boardId}`, {
                title: newBoard
              })
              .then(() => {
                //           //then update the recipe
                firestore
                  .add(
                    { collection: "recipes" },
                    { board: boardId, ...newRecipe }
                  )
                  .then(res => history.push(`/recipe/${res.id}`))
                  .catch(err => console.log(err));
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      } else {
        firestore
          .add({ collection: "recipes" }, { board: board, ...newRecipe })
          .then(res => history.push(`/recipe/${res.id}`))
          .catch(err => console.log(err));
      }
    }
  };

  render() {
    const { profile } = this.props;
    const {
      error,
      board,
      userBoards,
      newBoard,
      showNewBoard,
      recipeExists,
      recipe
    } = this.state;
    if (recipe.id && recipeExists && profile) {
      return (
        <form onSubmit={this.onSubmit}>
          <Modal thin>
            <ModalHeader>Enregistrer une recette</ModalHeader>
            <ModalBody>
              {/* @field Board */}
              <label htmlFor="board" className="block font-bold mb-1 text-lg">
                Choisir un tableau
                <i className="fas fa-chevron-down absolute pin-r mr-8 mt-10 text-grey-darker" />
                <select
                  name="board"
                  className="w-full p-3 my-2 rounded bg-grey-light font-bold cursor-pointer appearance-none text-dark"
                  value={board}
                  onChange={this.onChange}
                >
                  {userBoards.map(board => (
                    <option value={board.id} key={`board-${board.id}`}>
                      {board.title}
                    </option>
                  ))}
                  <option value="board-new">Créer un nouveau tableau</option>
                </select>
                {showNewBoard && (
                  <input
                    type="text"
                    name="newBoard"
                    value={newBoard}
                    onChange={this.onChange}
                    placeholder="légumes colorés"
                    className={classnames("w-full p-3 my-2 rounded", {
                      hidden: !showNewBoard,
                      "border-red border": error,
                      "border-grey-dark border": !error
                    })}
                  />
                )}
                {error && (
                  <span className="block my-1 p-4 font-normal rounded bg-red-lightest border border-red italic text-sm">
                    {error}
                  </span>
                )}
              </label>
            </ModalBody>
            <ModalFooter>
              <Link
                to={`/recipe/${recipe.id}`}
                className="btn ml-auto mr-2 no-underline"
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
    } else if (recipe && !recipeExists) {
      return <Page404 />;
    } else {
      return (
        <Modal thin>
          <ModalHeader>Enregistrer une recette</ModalHeader>
          <ModalBody>
            <Spinner />
          </ModalBody>
        </Modal>
      );
    }
  }
}

PinRecipe.propTyps = {
  firestore: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object,
  profile: PropTypes.object
};

export default compose(
  firestoreConnect(),
  firebaseConnect(),
  connect(state => ({
    profile: state.firebase.profile,
    auth: state.firebase.auth
  }))
)(PinRecipe);
