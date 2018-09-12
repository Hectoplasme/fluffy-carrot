import React, { Component } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

//Components
import { Modal, ModalHeader, ModalFooter, ModalBody } from "../layout/Modal";
import AddRecipeImg from "./AddRecipeImg";
import AddList from "./AddList";

class AddRecipe extends Component {
  state = {
    board: "board-new",
    showNewBoardInput: true,
    newBoard: "",
    title: "",
    description: "",
    difficulty: "easy",
    hours: "",
    minutes: "",
    quantity: "",
    keywords: "",
    imgUrl: "",
    ingredients: [],
    ustensils: [],
    steps: [],
    errors: {}
  };

  constructor(props) {
    super(props);
    this.upload = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();

    const {
      board,
      newBoard,
      title,
      description,
      difficulty,
      hours,
      minutes,
      quantity,
      keywords,
      imgUrl,
      ingredients,
      ustensils,
      steps
    } = this.state;

    //Check for error
    const errors = {};

    const regexp = RegExp(/^ *$/); //Test if the string is empty or contain only space

    if (regexp.test(title)) {
      errors.title = "Vous n'avez pas saisi de titre.";
    }

    if (board === "board-new" && regexp.test(newBoard)) {
      errors.board = "Vous n'avez pas choisi de tableau.";
    }

    if ((hours === "" || hours === 0) && (minutes === "" || minutes === 0)) {
      errors.time = "Vous n'avez pas saisi de temps de préparation.";
    }

    if (quantity === "" || quantity === 0) {
      errors.quantity = "Vous n'avez pas saisi de quantité.";
    }

    // if ()
    // if (!regexp.test(imgUrl) && !this.checkImageExists(imgUrl)) {
    //   errors.imgUrl = "Cette image ou cet url n'est pas valide.";
    // }

    if (ingredients.length === 0) {
      errors.ingredients = "Vous n'avez saisi aucun ingrédients.";
    }

    if (steps.length === 0) {
      errors.steps = "Vous n'avez entré aucune étape.";
    }

    if (regexp.test(imgUrl)) {
      errors.imgUrl = "Vous n'avez pas saisi d'image.";
    } else {
      this.checkImageExists(imgUrl, () => {
        this.setState({
          errors: {
            ...errors,
            imgUrl: "Cette image ou cet url n'est pas valide."
          }
        });
      });
    }

    if (Object.keys(errors).length !== 0) {
      this.setState({
        errors: errors
      });
    } else {
      const keywordsArray = keywords
        .split(",")
        .join(" ")
        .split(" ")
        .filter(item => item !== "");

      const newRecipe = {
        board: newBoard !== "" ? newBoard : board,
        title,
        description,
        difficulty,
        time: {
          hours: hours,
          minutes: minutes
        },
        quantity,
        keywords: keywordsArray,
        imgUrl,
        ustensils,
        steps
      };

      const { firestore, history } = this.props;

      firestore
        .add({ collection: "recipes" }, newRecipe)
        .then(() => history.push("/"));
    }
  };

  checkImageExists = (url, callback) => {
    let img = new Image();
    img.onload = () => {
      return true;
    };
    img.onerror = () => {
      callback();
    };
    img.src = url;
  };

  onChange = e => {
    if ([e.target.name] == "board" && e.target.value === "board-new") {
      this.setState({
        [e.target.name]: e.target.value,
        showNewBoardInput: true
      });
    } else if ([e.target.name] == "board" && e.target.value !== "board-new") {
      this.setState({
        [e.target.name]: e.target.value,
        showNewBoardInput: false,
        newBoard: ""
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };

  updateImgUrl = imgUrl => {
    this.setState({
      imgUrl: imgUrl
    });
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
    const {
      board,
      newBoard,
      showNewBoardInput,
      title,
      description,
      hours,
      minutes,
      difficulty,
      quantity,
      keywords,
      errors
    } = this.state;
    const { profile } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <Modal>
          <ModalHeader>Créer une recette</ModalHeader>
          <ModalBody>
            <div className="md:flex border-b border-grey-lighter">
              <div className="flex flex-col md:inline-flex items-center md:w-1/2 mx-0 p-4">
                <AddRecipeImg
                  onSuccess={this.updateImgUrl}
                  error={errors.imgUrl}
                />
              </div>
              <div className="md:w-1/2 mx-0 p-4">
                {/* @field Board */}
                <div className="mb-4 pb-8 border-b- border-grey-lighter">
                  <label
                    htmlFor="board"
                    className="block font-bold mb-1 text-lg"
                  >
                    Tableau
                  </label>
                  <i className="fas fa-chevron-down absolute pin-r mr-12 mt-6 text-grey-darker" />
                  <select
                    name="board"
                    className="w-full p-3 my-2 rounded bg-grey-light font-bold cursor-pointer appearance-none text-dark"
                    value={board}
                    onChange={this.onChange}
                  >
                    {profile.boards
                      ? profile.boards.map(board => (
                          <option key={board.id} value={board.id}>
                            {board.title}
                          </option>
                        ))
                      : null}
                    <option value="board-new">Créer un nouveau tableau</option>
                  </select>
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
                  {errors.board && (
                    <span className="text-red text-sm italic">
                      {errors.board}
                    </span>
                  )}
                </div>

                {/* @field Title */}
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
                    value={title}
                    onChange={this.onChange}
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
                    value={description}
                    onChange={this.onChange}
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
                    value={difficulty}
                    onChange={this.onChange}
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
                    value={hours}
                    onChange={this.onChange}
                    min={0}
                    placeholder="x"
                    className={classnames(
                      "inline-block w-12 py-3 px-3 my-2 mr-2 rounded text-center",
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
                    value={minutes}
                    onChange={this.onChange}
                    min={0}
                    placeholder="x"
                    className={classnames(
                      "inline-block w-12 py-3 px-3 my-2 mr-2 sm:ml-2 rounded text-center",
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
                    <div className="text-red text-sm italic">{errors.time}</div>
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

                  <span className={classnames({ "text-red": errors.quantity })}>
                    Pour
                  </span>
                  <input
                    type="number"
                    name="quantity"
                    value={quantity}
                    onChange={this.onChange}
                    placeholder="x"
                    className={classnames(
                      "inline-block w-12 py-3 px-3 my-2 mx-2 rounded text-center",
                      {
                        "border-red border-2": errors.quantity,
                        "border border-grey-dark": !errors.quantity
                      }
                    )}
                  />

                  <span className={classnames({ "text-red": errors.quantity })}>
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
              update={this.updateIngredients}
              error={errors.ingredients}
            />
            {/* @field ustensils */}
            <AddList
              title="Ustensile(s)"
              placeholder="Micro-onde"
              labelButton="Ajouter un ustensile"
              update={this.updateUstensils}
              error={errors.ustensils}
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

            {/* @field tags */}
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
                value={keywords}
                onChange={this.onChange}
                placeholder="poulet, entrée, risotto"
                className="w-full p-3 my-2 border border-grey-dark rounded"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Link
              to="/"
              className="btn mb-2 sm:mb-0 sm:ml-auto sm:mr-2 no-underline"
            >
              Annuler
            </Link>
            <input
              type="submit"
              className="btn btn--accent "
              value="Enregistrer"
            />
          </ModalFooter>
        </Modal>
      </form>
    );
  }
}

AddRecipe.propTypes = {
  firebase: PropTypes.object.isRequired,
  profile: PropTypes.object
};

export default compose(
  firestoreConnect(),
  connect(({ firebase: { profile } }) => ({ profile }))
)(AddRecipe);

// export default firestoreConnect()(AddRecipe);
