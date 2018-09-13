import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";

//Components
import { Modal, ModalHeader, ModalFooter, ModalBody } from "../layout/Modal";
import AddList from "./AddList";

class EditRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newBoard: "",
      showNewBoardInput: false,
      ingredients: [],
      ustensils: [],
      steps: [],
      errors: {}
    };

    this.boardInput = React.createRef();
    this.titleInput = React.createRef();
    this.descriptionInput = React.createRef();
    this.difficultyInput = React.createRef();
    this.hoursInput = React.createRef();
    this.minutesInput = React.createRef();
    this.quantityInput = React.createRef();
    this.keywordsInput = React.createRef();
  }

  componentWillReceiveProps(props) {
    const { auth, recipe, history } = props;
    if (recipe && auth.uid !== recipe.user) {
      history.push("/"); // redirect to home if not authorized
    }
  }

  onBoardDropdownChange = e => {
    const { newBoard, showNewBoardInput } = this.state;
    if (e.target.value == "board-new") {
      this.setState({
        showNewBoardInput: true
      });
    } else if (newBoard !== "") {
      this.setState({
        newBoard: "",
        showNewBoardInput: false
      });
    } else if (showNewBoardInput) {
      this.setState({
        showNewBoardInput: false
      });
    }
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

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const {
      showNewBoardInput,
      newBoard,
      ingredients,
      ustensils,
      steps
    } = this.state;
    //Check for error
    const errors = {};

    const regexp = RegExp(/^ *$/); //Test if the string is empty or contain only space

    if (regexp.test(this.titleInput.current.value)) {
      errors.title = "Vous n'avez pas saisi de titre.";
    }

    if (showNewBoardInput && regexp.test(newBoard)) {
      errors.board = "Vous n'avez pas choisi de tableau.";
    }

    if (
      (this.hoursInput.current.value === "" ||
        this.hoursInput.current.value == 0) &&
      (this.minutesInput.current.value === "" ||
        this.minutesInput.current.value == 0)
    ) {
      errors.time = "Vous n'avez pas saisi de temps de préparation.";
    }

    if (
      this.quantityInput.current.value === "" ||
      this.quantityInput.current.value == 0
    ) {
      errors.quantity = "Vous n'avez pas saisi de quantité.";
    }

    if (ingredients.length === 0) {
      errors.ingredients = "Vous n'avez saisi aucun ingrédient.";
    }

    if (steps.length === 0) {
      errors.steps = "Vous n'avez entré aucune étape.";
    }

    if (Object.keys(errors).length !== 0) {
      this.setState({
        errors: errors
      });
    } else {
      //Create the keywords array from string
      const keywordsArray = this.keywordsInput.current.value
        .split(/,\s?/)
        .filter(item => item !== "");

      const { recipe, firestore, auth, history, profile } = this.props;

      const newRecipe = {
        title: this.titleInput.current.value,
        description: this.descriptionInput.current.value,
        difficulty: this.difficultyInput.current.value,
        time: {
          hours: this.hoursInput.current.value,
          minutes: this.minutesInput.current.value
        },
        quantity: this.quantityInput.current.value,
        keywords: keywordsArray,
        ustensils,
        ingredients,
        steps
      };

      //If the recipe doesn't go in another board, we doesn't need to create a new one or to delete refs
      if (recipe.board === this.boardInput.current.value) {
        firestore
          .update({ collection: "recipes", doc: recipe.id }, newRecipe)
          .then(() => {
            history.push(`/recipe/${recipe.id}`);
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.boardInput.current.value != "board-new") {
        const newBoardValue = this.boardInput.current.value;
        const oldBoardValue = recipe.board;

        //If the board change but it exists already
        //First update the recipe
        firestore
          .update(
            { collection: "recipes", doc: recipe.id },
            { ...newRecipe, board: this.boardInput.current.value }
          )
          .then(() => {
            //then update the new recipe board adding the recipe
            const newBoardObj = profile.boards.find(
              boardObj => boardObj.id === newBoardValue
            );
            const newBoardRecipes = [...newBoardObj.recipes, recipe.id];
            newBoardObj.recipes = newBoardRecipes;

            firestore
              .update(
                { collection: "boards", doc: newBoardValue },
                { recipes: newBoardRecipes }
              )
              .then(() => {
                //then update the first board deleting the recipe
                const oldBoardObj = profile.boards.find(
                  boardObj => boardObj.id === oldBoardValue
                );
                const oldBoardRecipes = oldBoardObj.recipes.filter(
                  recipeItem => recipeItem != recipe.id
                );
                oldBoardObj.recipes = oldBoardRecipes;

                firestore
                  .update(
                    { collection: "boards", doc: oldBoardValue },
                    { recipes: oldBoardRecipes }
                  )
                  .then(() => {
                    //then update the user boards
                    const newUserBoards = profile.boards.filter(
                      boardObj =>
                        boardObj.id !== newBoardValue &&
                        boardObj.id !== oldBoardValue
                    );
                    const newUserBoardsUpd = [
                      ...newUserBoards,
                      newBoardObj,
                      oldBoardObj
                    ];

                    firestore
                      .update(
                        { collection: "users", doc: auth.uid },
                        { boards: newUserBoardsUpd }
                      )
                      .then(() => history.push(`/recipe/${recipe.id}`));
                  });
              });
          });
      } else {
        //Create the new board and add the recipe
        const oldBoardValue = recipe.board;

        firestore
          .add(
            { collection: "boards" },
            { title: newBoard, author: auth.uid, recipes: [recipe.id] }
          )
          .then(res => {
            const newBoardValue = res.id;
            const newBoardObj = {
              id: newBoardValue,
              title: newBoard,
              author: auth.uid,
              recipes: [recipe.id]
            };
            //then update the recipe
            firestore
              .update(
                { collection: "recipes", doc: recipe.id },
                { ...newRecipe, board: newBoardValue }
              )
              .then(() => {
                //then update the first board deleting the recipe
                const oldBoardObj = profile.boards.find(
                  boardObj => boardObj.id === oldBoardValue
                );
                const oldBoardRecipes = oldBoardObj.recipes.filter(
                  recipeItem => recipeItem != recipe.id
                );
                oldBoardObj.recipes = oldBoardRecipes;

                firestore
                  .update(
                    { collection: "boards", doc: oldBoardValue },
                    { recipes: oldBoardRecipes }
                  )
                  .then(() => {
                    //then update the user boards
                    const newUserBoards = profile.boards.filter(
                      boardObj =>
                        boardObj.id !== newBoardValue &&
                        boardObj.id !== oldBoardValue
                    );
                    const newUserBoardsUpd = [
                      ...newUserBoards,
                      newBoardObj,
                      oldBoardObj
                    ];

                    firestore
                      .update(
                        { collection: "users", doc: auth.uid },
                        { boards: newUserBoardsUpd }
                      )
                      .then(() => history.push(`/recipe/${recipe.id}`));
                  });
              });
          });
      }
    }
  };

  render() {
    const { showNewBoardInput, newBoard, errors } = this.state;
    const { recipe, profile } = this.props;

    if (recipe) {
      return (
        <form onSubmit={this.onSubmit}>
          <Modal>
            <ModalHeader>Editer une recette</ModalHeader>
            <ModalBody>
              <div className="md:flex border-b border-grey-lighter">
                <div className="flex flex-col md:inline-flex items-center md:w-1/2 mx-0 p-4">
                  {/* The image won't be editable ! */}
                  <img
                    src={recipe.imgUrl}
                    className="bg-grey-light rounded-lg"
                    alt=""
                  />
                </div>
                {/* @Field board */}
                <div className="md:w-1/2 mx-0 p-4">
                  <div className="mb-4 pb-0 border-b- border-grey-lighter">
                    <label
                      htmlFor="board"
                      className="block font-bold mb-1 text-lg"
                    >
                      Tableau
                    </label>
                    <i className="fas fa-chevron-down absolute pin-r mr-12 mt-6 text-grey-darker" />
                    {/* Wait the board list from the profile before render it */}
                    {profile.boards && (
                      <div>
                        <select
                          name="board"
                          className="w-full p-3 my-2 rounded bg-grey-light font-bold cursor-pointer appearance-none text-dark"
                          defaultValue={recipe.board}
                          ref={this.boardInput}
                          onChange={this.onBoardDropdownChange}
                        >
                          {profile.boards
                            ? profile.boards.map((board, i) => (
                                <option key={`board-${i}`} value={board.id}>
                                  {board.title}
                                </option>
                              ))
                            : null}
                          <option value="board-new">
                            Créer un nouveau tableau
                          </option>
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
                  </div>

                  {/* @Field title */}
                  <div className="mb-4">
                    <label
                      htmlFor="title"
                      className="block font-bold mb-1 text-lg"
                    >
                      Titre de la recette
                    </label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={recipe.title}
                      ref={this.titleInput}
                      placeholder="Risotto au poulet"
                      className={classnames("w-full p-3 my-2 rounded", {
                        "border border-grey-dark": !errors.title,
                        "border-red border-2": errors.title
                      })}
                    />
                    {errors.title && (
                      <span className="text-red text-sm italic">
                        {errors.title}
                      </span>
                    )}
                  </div>

                  {/* @field description */}
                  <div className="mb-4  border-b border-grey-lighter">
                    <label
                      htmlFor="description"
                      className="block font-bold mb-1 text-lg"
                    >
                      Description de la recette
                    </label>
                    <textarea
                      type="text"
                      name="description"
                      defaultValue={recipe.description}
                      ref={this.descriptionInput}
                      placeholder="Donnez un avant goût de votre recette, racontez son histoire"
                      className="w-full h-32 p-3 my-2 border border-grey-dark rounded resize-none"
                    />
                  </div>

                  {/* @field Difficulty */}
                  <div className="mb-4">
                    <label
                      htmlFor="difficulty"
                      className="block font-bold mb-1 text-lg"
                    >
                      Difficulté
                    </label>
                    <i className="fas fa-chevron-down absolute pin-r mr-12 mt-6 text-grey-darker" />
                    <select
                      name="difficulty"
                      className="w-full p-3 my-2 rounded bg-grey-light font-bold cursor-pointer appearance-none text-dark"
                      defaultValue={recipe.difficulty}
                      ref={this.difficultyInput}
                    >
                      <option value="very-easy">Très facile</option>
                      <option value="easy">Facile</option>
                      <option value="medium">Moyenne</option>
                      <option value="hard">Difficile</option>
                    </select>
                  </div>

                  {/* @field Time */}
                  <div className="mb-4">
                    <label className="block font-bold mb-1 text-lg">
                      Temps de préparation
                    </label>
                    <input
                      type="number"
                      name="hours"
                      defaultValue={recipe.time.hours}
                      ref={this.hoursInput}
                      min={0}
                      placeholder="x"
                      className={classnames(
                        "inline-block w-12 py-3 px-3 my-2 mr-2 rounded text-center border border-grey-dark",
                        {
                          "border border-grey-dark": !errors.time,
                          "border-red border-2": errors.time
                        }
                      )}
                    />
                    <span className={classnames({ "text-red": errors.time })}>
                      heures
                    </span>
                    <br className="sm:hidden" />
                    <input
                      type="number"
                      name="minutes"
                      defaultValue={recipe.time.minutes}
                      ref={this.minutesInput}
                      min={0}
                      placeholder="x"
                      className={classnames(
                        "inline-block w-12 py-3 px-3 my-2 mr-2 sm:ml-2 rounded text-center border border-grey-dark",
                        {
                          "border border-grey-dark": !errors.time,
                          "border-red border-2": errors.time
                        }
                      )}
                    />
                    <span className={classnames({ "text-red": errors.time })}>
                      minutes
                    </span>
                    {errors.time && (
                      <div className="text-red text-sm italic">
                        {errors.time}
                      </div>
                    )}
                  </div>

                  {/* @field quantity */}
                  <div>
                    <label
                      htmlFor="quantity"
                      className="block font-bold mb-1 text-lg"
                    >
                      Nombres de portions
                    </label>

                    <span
                      className={classnames({ "text-red": errors.quantity })}
                    >
                      Pour
                    </span>
                    <input
                      type="number"
                      name="quantity"
                      defaultValue={recipe.quantity}
                      ref={this.quantityInput}
                      placeholder="x"
                      className={classnames(
                        "inline-block w-12 py-3 px-3 my-2 mx-2 rounded text-center ",
                        {
                          "border-red border-2": errors.quantity,
                          "border border-grey-dark": !errors.quantity
                        }
                      )}
                    />
                    <span
                      className={classnames({ "text-red": errors.quantity })}
                    >
                      personnes
                    </span>
                    {errors.quantity && (
                      <div className="text-red text-sm italic">
                        {errors.quantity}
                      </div>
                    )}
                  </div>
                </div>
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
              <div className="mb-4 pt-8 px-4 md:px-8">
                <label htmlFor="tag" className="block font-bold mb-2 text-lg">
                  Mots clés
                </label>
                <div className="italic mb-4 text-sm">
                  Séparez par des virgules.{" "}
                  <span className="text-grey-dark">
                    Exemple : poulet, entrée, risotto
                  </span>
                </div>
                <input
                  type="text"
                  name="keywords"
                  defaultValue={recipe.keywords.join(", ")}
                  ref={this.keywordsInput}
                  placeholder="poulet, entrée, risotto"
                  className="w-full p-3 my-2 border border-grey-dark rounded"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Link
                to={`/recipe/delete/${recipe.id}`}
                className="btn mr-2 no-underline"
              >
                Supprimer
              </Link>
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
      return null;
    }
  }
}

EditRecipe.propTypes = {
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
)(EditRecipe);
