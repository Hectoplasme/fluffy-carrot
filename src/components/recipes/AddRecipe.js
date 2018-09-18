import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect, firestoreConnect } from "react-redux-firebase";

//Components
import AddList from "./AddListItem";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "../layout/Modal";
import Page404 from "../pages/404";

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: "",
      title: "",
      description: "",
      difficulty: "very-easy",
      hours: "",
      minutes: "",
      quantity: "",
      ingredients: [],
      ustensils: [],
      steps: [],
      keywords: "",
      board: "board-new",
      newBoard: "",
      showNewBoard: true,
      userBoards: [],
      userBoardsLoaded: false,
      errors: {}
    };
  }

  componentDidMount() {
    const { firestore, auth } = this.props;
    const { userBoardsLoaded } = this.state;

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
            showNewBoard: userBoards[0] ? false : true,
            userBoards,
            userBoardsLoaded: true
          });
        }
      });
    }
  }

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

    const {
      board,
      newBoard,
      imgUrl,
      title,
      hours,
      minutes,
      quantity,
      ingredients,
      steps
    } = this.state;

    // alert("pouet");

    //check for errors
    const errors = {};
    const regexp = RegExp(/^ *$/); //Test if the string is empty or contain only space

    if (board === "board-new" && regexp.test(newBoard)) {
      errors.board = "Vous n'avez pas choisi de tableau.";
    }

    if (regexp.test(title)) {
      errors.title = "Vous n'avez pas saisi de titre pour votre recette.";
    }

    if (
      (hours === "0" || regexp.test(hours)) &&
      (minutes === "0" || regexp.test(minutes))
    ) {
      errors.time = "Vous n'avez pas saisi de temps de préparation.";
    }

    if (quantity === "0" || regexp.test(quantity)) {
      errors.quantity = "Vous n'avez pas saisi de quantité.";
    }

    if (ingredients.length === 0) {
      errors.ingredients = "Veuillez saisir au moins un ingrédient.";
    }

    if (steps.length === 0) {
      errors.steps = "Veuillez saisir au moins une étape.";
    }

    //Check if the image exist and wait for the response
    this.checkImageExists(
      imgUrl,
      () => {
        //If not we send the error
        this.setState({
          errors: {
            ...errors,
            imgUrl: "Cette image ou cet url n'est pas valide."
          }
        });
      },
      () => {
        //If the image exists we check for others errors
        if (Object.keys(errors).length !== 0) {
          this.setState({ errors });
        } else {
          //No errors, we can go!
          this.createRecipe();
        }
      }
    );
  };

  createRecipe = () => {
    const { firestore, profile, auth, history } = this.props;
    const {
      imgUrl,
      board,
      newBoard,
      title,
      description,
      difficulty,
      hours,
      minutes,
      quantity,
      ingredients,
      ustensils,
      steps,
      keywords
    } = this.state;

    const newRecipe = {
      user: profile.slug,
      imgUrl,
      title,
      description,
      difficulty,
      time: { hours, minutes },
      quantity,
      ingredients,
      ustensils,
      steps,
      keywords: keywords.split(/,\s?/).filter(item => item !== "")
    };

    if (board === "board-new") {
      //If the board doesn't exist yet
      //add the board
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
              //then create the recipe
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
      imgUrl,
      errors,
      userBoards,
      board,
      newBoard,
      showNewBoard,
      title,
      description,
      difficulty,
      hours,
      minutes,
      quantity,
      keywords
    } = this.state;

    if (profile) {
      return (
        <form onSubmit={this.onSubmit}>
          <Modal>
            <ModalHeader>Créer une recette</ModalHeader>
            <ModalBody>
              <div className="p-4">
                <div className="mb-4 pb-8 border-b border-grey-lighter">
                  {/* @field Image url */}
                  <label
                    htmlFor="imgUrl"
                    className="block font-bold mb-1 text-lg"
                  >
                    Url de la photo de présentation{" "}
                    <input
                      type="text"
                      name="imgUrl"
                      value={imgUrl}
                      onChange={this.onChange}
                      placeholder="https://picsum.photos/400/200/?random"
                      className={classnames("w-full p-3 my-2 rounded", {
                        "border border-grey-dark": !errors.imgUrl,
                        "border-red border": errors.imgUrl
                      })}
                    />
                    {errors.imgUrl && (
                      <span className="block my-1 p-4 font-normal rounded bg-red-lightest border border-red italic text-sm">
                        {errors.imgUrl}
                      </span>
                    )}
                  </label>
                </div>

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
                      value={board}
                      onChange={this.onChange}
                      className="w-full p-3 my-2 rounded bg-grey-light font-bold cursor-pointer appearance-none text-dark"
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
                      value={title}
                      onChange={this.onChange}
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
                    Description de la recette
                    <textarea
                      name="description"
                      value={description}
                      onChange={this.onChange}
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
                      value={difficulty}
                      onChange={this.onChange}
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
                      value={hours}
                      onChange={this.onChange}
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
                      value={minutes}
                      onChange={this.onChange}
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
                      value={quantity}
                      onChange={this.onChange}
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
                  update={this.updateIngredients}
                  error={errors.ingredients}
                />
                {/* @field ustensils */}
                <AddList
                  title="Ustensile(s)"
                  placeholder="Micro-onde"
                  labelButton="Ajouter un ustensile"
                  update={this.updateUstensils}
                />

                {/* @field steps
            @todo handle add steps */}
                <AddList
                  step
                  title="Etapes de la préparation"
                  placeholder="Coupez les oignons"
                  labelButton="Ajouter une étape"
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
                      value={keywords}
                      onChange={this.onChange}
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
                to={`/${profile.slug}`}
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
    } else {
      return <Page404 />;
    }
  }
}

AddRecipe.propTyps = {
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
)(AddRecipe);
