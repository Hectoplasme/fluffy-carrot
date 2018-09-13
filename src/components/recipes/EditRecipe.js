import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";

//Components
import { Modal, ModalHeader, ModalFooter, ModalBody } from "../layout/Modal";
import Home from "../pages/Home";

class EditRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newBoard: "",
      showNewBoardInput: false
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

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { showNewBoardInput, newBoard } = this.state;
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
                            className={classnames(
                              "w-full p-3 my-2 rounded border-grey-dark border",
                              {
                                hidden: !showNewBoardInput
                                // "border-red border-2": errors.board,
                                // "border-grey-dark border": !errors.board
                              }
                            )}
                          />
                        )}
                        {/* {errors.board && (
                          <span className="text-red text-sm italic">
                            {errors.board}
                          </span>
                        )} */}
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
                      className={classnames(
                        "w-full p-3 my-2 rounded border border-grey-dark",
                        {
                          // "border border-grey-dark": !errors.title,
                          // "border-red border-2": errors.title
                        }
                      )}
                    />
                    {/* {errors.title && (
                    <span className="text-red text-sm italic">
                      {errors.title}
                    </span>
                  )} */}
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
                          // "border border-grey-dark": !errors.time,
                          // "border-red border-2": errors.time
                        }
                      )}
                    />
                    <span
                    // className={ classnames({ "text-red": errors.time })}
                    >
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
                          // "border border-grey-dark": !errors.time,
                          // "border-red border-2": errors.time
                        }
                      )}
                    />
                    <span
                    // className={classnames({ "text-red": errors.time })}
                    >
                      minutes
                    </span>
                    {/* {errors.time && (
                    <div className="text-red text-sm italic">{errors.time}</div>
                  )} */}
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
                    // className={classnames({ "text-red": errors.quantity })}
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
                        "inline-block w-12 py-3 px-3 my-2 mx-2 rounded text-center border border-grey-dark",
                        {
                          // "border-red border-2": errors.quantity,
                          // "border border-grey-dark": !errors.quantity
                        }
                      )}
                    />
                    <span
                    // className={classnames({ "text-red": errors.quantity })}
                    >
                      personnes
                    </span>
                    {/* {errors.quantity && (
                    <div className="text-red text-sm italic">
                      {errors.quantity}
                    </div>
                  )} */}
                  </div>
                </div>
              </div>

              {/* @field ingredients */}

              {/* @field ustensils */}

              {/* @field steps */}

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
              <button className="btn mr-2">Supprimer</button>
              <button className="btn ml-auto mr-2">Annuler</button>
              <button className="btn btn--accent ">Enregistrer</button>
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
