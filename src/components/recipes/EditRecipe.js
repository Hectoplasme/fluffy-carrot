import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classnames from "classnames";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect, firestoreConnect } from "react-redux-firebase";

//Components
import { Modal, ModalHeader, ModalBody, ModalFooter } from "../layout/Modal";
import AddList from "./AddListItem";
import Page404 from "../pages/404";
import Spinner from "../layout/Spinner";

class EditRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      ingredients: [],
      ustensils: [],
      steps: [],
      newBoard: "",
      showNewBoard: true,
      userBoards: [],
      userBoardsLoaded: false,
      recipeExists: true,
      errors: {}
    };

    this.imgInput = React.createRef();
    this.boardInput = React.createRef();
    this.titleInput = React.createRef();
    this.descriptionInput = React.createRef();
    this.difficultyInput = React.createRef();
    this.hoursInput = React.createRef();
    this.minutesInput = React.createRef();
    this.quantityInput = React.createRef();
    this.keywordsInput = React.createRef();
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
    const { firestore, auth } = this.props;
    const { userBoardsLoaded, recipeExists, recipe } = this.state;

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
            board: userBoards[0] ? userBoards[0].id : "board-new",
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

  onBoardDropdownChange = e => {
    const { newBoard, showNewBoard } = this.state;
    if (e.target.value == "board-new") {
      this.setState({
        showNewBoard: true
      });
    } else if (newBoard !== "") {
      this.setState({
        newBoard: "",
        showNewBoard: false
      });
    } else if (showNewBoard) {
      this.setState({
        showNewBoard: false
      });
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { newBoard, showNewBoard, ingredients, steps } = this.state;

    // alert("pouet");

    //check for errors
    const errors = {};
    const regexp = RegExp(/^ *$/); //Test if the string is empty or contain only space

    if (showNewBoard && regexp.test(newBoard)) {
      errors.board = "Vous n'avez pas choisi de tableau.";
    }

    if (regexp.test(this.titleInput.current.value)) {
      errors.title = "Vous n'avez pas saisi de titre pour votre recette.";
    }

    if (
      (this.hoursInput.current.value === "0" ||
        regexp.test(this.hoursInput.current.value)) &&
      (this.minutesInput.current.value === "0" ||
        regexp.test(this.minutesInput.current.value))
    ) {
      errors.time = "Vous n'avez pas saisi de temps de préparation.";
    }

    if (
      this.quantityInput.current.value === "0" ||
      regexp.test(this.quantityInput.current.value)
    ) {
      errors.quantity = "Vous n'avez pas saisi de quantité.";
    }

    if (ingredients.length === 0) {
      errors.ingredients = "Veuillez saisir au moins un ingrédient.";
    }

    if (steps.length === 0) {
      errors.steps = "Veuillez saisir au moins une étape.";
    }

    //Check if the errors object is empty
    if (Object.keys(errors).length !== 0) {
      this.setState({ errors });
    } else {
      //No errors, we can go!
      this.createRecipe();
    }
  };

  createRecipe = () => {
    const { firestore, profile, auth, history } = this.props;
    const {
      newBoard,
      showNewBoard,
      ingredients,
      ustensils,
      steps,
      recipe
    } = this.state;

    const newRecipe = {
      title: this.titleInput.current.value,
      description: this.descriptionInput.current.value,
      difficulty: this.difficultyInput.current.value,
      time: {
        hours: this.hoursInput.current.value,
        minutes: this.minutesInput.current.value
      },
      quantity: this.quantityInput.current.value,
      ingredients,
      ustensils,
      steps,
      keywords: this.keywordsInput.current.value
        .split(/,\s?/)
        .filter(item => item !== "")
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
                .update(
                  { collection: "recipes", doc: recipe.id },
                  { board: boardId, ...newRecipe }
                )
                .then(res => history.push(`/recipe/${recipe.id}`))
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    } else {
      firestore
        .update(
          { collection: "recipes", doc: recipe.id },
          { board: this.boardInput.current.value, ...newRecipe }
        )
        .then(res => history.push(`/recipe/${recipe.id}`))
        .catch(err => console.log(err));
    }
  };

  checkImageExists = (url, ifFalse, ifTrue) => {
    let img = new Image();
    img.onload = () => {
      ifTrue();
    };
    img.onerror = () => {
      ifFalse();
    };
    img.src = url;
  };

  updateIngredients = array => {
    this.setState({
      ingredients: array
    });
  };

  updateUstensils = array => {
    this.setState({
      ustensils: array
    });
  };

  updateSteps = array => {
    this.setState({
      steps: array
    });
  };

  render() {
    const { profile } = this.props;
    const {
      errors,
      userBoards,
      newBoard,
      showNewBoard,
      recipeExists,
      recipe
    } = this.state;

    if (recipe.id && recipeExists && profile) {
      return (
        <form onSubmit={this.onSubmit}>
          <Modal>
            <ModalHeader>Modifier une recette</ModalHeader>
            <ModalBody>
              <div className="p-4">
                <div className="mb-4 pb-8 border-b border-grey-lighter text-center">
                  <img
                    className="bg-grey-light rounded-lg max-w-100"
                    src={recipe.imgUrl}
                    alt={recipe.title}
                  />
                </div>

                {userBoards.length > 0 && (
                  <div className="mb-4 pb-8 border-b border-grey-lighter">
                    {/* @field Board */}
                    <label
                      htmlFor="board"
                      className="block font-bold mb-1 text-lg"
                    >
                      Choisir un tableau
                      <i className="fas fa-chevron-down absolute pin-r mr-12 mt-10 text-grey-darker" />
                      <select
                        name="board"
                        defaultValue={recipe.board}
                        ref={this.boardInput}
                        onChange={this.onBoardDropdownChange}
                        className="w-full p-3 my-2 rounded bg-grey-light font-bold cursor-pointer appearance-none text-dark"
                      >
                        >
                        {userBoards.map(board => (
                          <option value={board.id} key={`board-${board.id}`}>
                            {board.title}
                          </option>
                        ))}
                        <option value="board-new">
                          Créer un nouveau tableau
                        </option>
                      </select>
                      {showNewBoard && (
                        <input
                          type="text"
                          name="newBoard"
                          value={newBoard}
                          onChange={this.onChange}
                          placeholder="légumes colorés"
                          className={classnames("w-full p-3 my-2 rounded", {
                            "border-red border": errors.board,
                            "border-grey-dark border": !errors.board
                          })}
                        />
                      )}
                      {errors.board && (
                        <span className="block my-1 p-4 font-normal rounded bg-red-lightest border border-red italic text-sm">
                          {errors.board}
                        </span>
                      )}
                    </label>
                  </div>
                )}

                {/* @field Title */}
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block font-bold mb-1 text-lg"
                  >
                    Titre de la recette{" "}
                    <input
                      type="text"
                      name="title"
                      defaultValue={recipe.title}
                      ref={this.titleInput}
                      placeholder="Risotto à la crevette"
                      className={classnames("w-full p-3 my-2 rounded", {
                        "border border-grey-dark": !errors.title,
                        "border-red border": errors.title
                      })}
                    />
                    {errors.title && (
                      <span className="block my-1 p-4 font-normal rounded bg-red-lightest border border-red italic text-sm">
                        {errors.title}
                      </span>
                    )}
                  </label>
                </div>

                {/* @field Description */}
                <div className="mb-4 border-b border-grey-lighter">
                  <label
                    htmlFor="description"
                    className="block font-bold mb-4 text-lg"
                  >
                    <textarea
                      name="description"
                      defaultValue={recipe.description}
                      ref={this.descriptionInput}
                      placeholder="Donnez un avant goût de votre recette, racontez son histoire"
                      className="w-full h-32 p-3 my-2 border border-grey-dark rounded resize-none"
                    />
                  </label>
                </div>

                {/* @field difficulty */}
                <div className="mb-4">
                  <label
                    htmlFor="difficulty"
                    className="block font-bold mb-1 text-lg"
                  >
                    Difficulté{" "}
                    <i className="fas fa-chevron-down absolute pin-r mr-12 mt-10 text-grey-darker" />
                    <select
                      name="difficulty"
                      className="w-full p-3 my-2 rounded bg-grey-light font-bold cursor-pointer appearance-none text-dark"
                      ref={this.difficultyInput}
                    >
                      <option value="very-easy">Très facile</option>
                      <option value="easy">Facile</option>
                      <option value="medium">Moyenne</option>
                      <option value="hard">Difficile</option>
                    </select>
                  </label>
                </div>

                {/* @field time */}
                <div className="mb-4">
                  <label
                    htmlFor="time"
                    className="block font-bold mb-1 text-lg"
                  >
                    <span className="mb-1 block">Temps de préparation</span>
                    <input
                      type="number"
                      min="0"
                      name="hours"
                      defaultValue={recipe.time.hours}
                      ref={this.hoursInput}
                      placeholder="x"
                      className={classnames(
                        "inline-block w-12 py-3 px-3 my-2 mr-2 rounded text-center",
                        {
                          "border border-grey-dark": !errors.time,
                          "border-red border": errors.time
                        }
                      )}
                    />{" "}
                    <span
                      className={classnames("font-normal", {
                        "text-red": errors.time
                      })}
                    >
                      heures{" "}
                    </span>
                    <input
                      type="number"
                      min="0"
                      name="minutes"
                      defaultValue={recipe.time.minutes}
                      ref={this.minutesInput}
                      placeholder="x"
                      className={classnames(
                        "inline-block w-12 py-3 px-3 my-2 mr-2 rounded text-center",
                        {
                          "border border-grey-dark": !errors.time,
                          "border-red border": errors.time
                        }
                      )}
                    />
                    <span
                      className={classnames("font-normal", {
                        "text-red": errors.time
                      })}
                    >
                      minutes
                    </span>
                    {errors.time && (
                      <span className="block my-1 p-4 font-normal rounded bg-red-lightest border border-red italic text-sm">
                        {errors.time}
                      </span>
                    )}
                  </label>
                </div>

                {/* @field quantity */}
                <div className="mb-4 pb-4 border-b border-grey-lighter">
                  <label
                    htmlFor="quantity"
                    className="block font-bold mb-1 text-lg"
                  >
                    <span className="mb-1 block">Nombres de portions</span>

                    <span
                      className={classnames("font-normal", {
                        "text-red": errors.time
                      })}
                    >
                      Pour
                    </span>
                    <input
                      type="number"
                      name="quantity"
                      min="0"
                      defaultValue={recipe.quantity}
                      ref={this.quantityInput}
                      placeholder="x"
                      className={classnames(
                        "inline-block w-12 py-3 px-3 my-2 mx-2 rounded text-center",
                        {
                          "border-red border": errors.quantity,
                          "border border-grey-dark": !errors.quantity
                        }
                      )}
                    />
                    <span
                      className={classnames("font-normal", {
                        "text-red": errors.time
                      })}
                    >
                      personne(s)
                    </span>
                  </label>
                  {errors.quantity && (
                    <span className="block my-1 p-4 font-normal rounded bg-red-lightest border border-red italic text-sm">
                      {errors.quantity}
                    </span>
                  )}
                </div>

                {/* @field ingredients */}

                <AddList
                  title="Ingrédient(s)"
                  placeholder="1 cuillère à soupe de sucre"
                  labelButton="Ajouter un ingrédient"
                  items={recipe.ingredients}
                  update={this.updateIngredients}
                  error={errors.ingredients}
                />

                {/* @field ustensils */}
                <AddList
                  title="Ustensile(s)"
                  placeholder="Micro-onde"
                  labelButton="Ajouter un ustensile"
                  items={recipe.ustensils}
                  update={this.updateUstensils}
                  error={errors.ustensils}
                />

                {/* @field steps */}
                <AddList
                  step
                  title="Etapes de la préparation"
                  placeholder="Coupez les oignons"
                  labelButton="Ajouter une étape"
                  items={recipe.steps}
                  update={this.updateSteps}
                  error={errors.steps}
                />

                {/* @field keywords */}
                <div className="mb-4 pt-8">
                  <label
                    htmlFor="keywords"
                    className="block font-bold mb-2 text-lg"
                  >
                    Mots clés{" "}
                    <div className="font-normal italic mt-2 mb-4 text-sm">
                      Séparez par des virgules.{" "}
                      <span className="text-grey-dark">
                        Exemple : poulet, entrée, risotto
                      </span>
                    </div>
                    <input
                      type="text"
                      name="keywords"
                      defaultValue={
                        recipe.keywords ? recipe.keywords.join(", ") : ""
                      }
                      ref={this.keywordsInput}
                      placeholder="risotto, poulet, épinards, fondant"
                      className="w-full p-3 my-2 border border-grey-dark rounded"
                    />
                  </label>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              {/* @field submit */}
              <Link
                to={`/recipe/delete/${recipe.id}`}
                className="btn mb-2 sm:mb-0 sm:mr-auto sm:mr-2 no-underline"
              >
                Supprimer la recette
              </Link>
              <Link
                to={`/recipe/${recipe.id}`}
                className="btn mb-2 sm:mb-0 sm:ml-auto sm:mr-2 no-underline"
              >
                Annuler
              </Link>
              <input
                type="submit"
                className="btn btn--accent cursor-pointer"
                value="Enregistrer la recette"
              />
            </ModalFooter>
          </Modal>
        </form>
      );
    } else if (!recipe && !recipeExists) {
      return <Page404 />;
    } else {
      return (
        <Modal>
          <ModalHeader>Modifier une recette</ModalHeader>
          <ModalBody>
            <Spinner />
          </ModalBody>
        </Modal>
      );
    }
  }
}

EditRecipe.propTyps = {
  firestore: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object,
  profile: PropTypes.object
};

export default compose(
  firestoreConnect(),
  firebaseConnect(),
  connect(({ firebase }) => ({
    profile: firebase.profile,
    auth: firebase.auth
  }))
)(EditRecipe);
