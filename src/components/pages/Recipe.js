import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";

//Components
import List from "../layout/List";
import RecipeUserInfos from "./recipe-parts/recipeUserInfos";
// import Recipes from "../recipes/Recipes";

class Recipe extends Component {
  componentWillReceiveProps(props) {
    const { auth, recipe, recipeExists, history } = props;
    if (!recipeExists) {
      history.push("/");
    }
  }

  render() {
    const { recipe, auth } = this.props;

    return (
      <div
        className="bg-grey-light min-h-screen pt-8"
        style={{
          background: "linear-gradient(#dae1e7, white)"
        }}
      >
        <div className="px-4">
          <div className="max-w-lg mx-auto p-4 pb-4 bg-white rounded-lg mx-4 mt-12 mb-20 lg:mt-0">
            {recipe && (
              <div>
                <div className="pr-4 mb-4 flex items-center">
                  <Link
                    to="/"
                    className="link absolute 
                    pin-l overflow-hidden pr-4 
                    -mt-20
                    lg:-mt-6
                    ml-4
                    text-black 
                    hover:bg-transparent
                    after:bg-grey-light"
                  >
                    <i className=" fas fa-chevron-left inline-block -ml-1 -mt-1 mr-2 text-2xl align-middle" />
                    <span> Accueil</span>
                  </Link>
                  {auth.uid === recipe.user && (
                    <Link
                      to={`/recipe/edit/${recipe.id}`}
                      className="btn-floating h-12 w-12 text-2xl mr-2 ml-2"
                    >
                      <i className="fas fa-pen icon" />
                    </Link>
                  )}
                  <button className="btn-floating h-12 w-12 text-2xl mr-2 sm:hidden">
                    <i className="fas fa-share-alt icon" />
                  </button>
                  <button className="hidden sm:inline-block btn ml-auto mr-2">
                    <i className="fas fa-share-alt icon" />
                    Partager
                  </button>
                  {auth.uid ? (
                    <Link
                      to={`/recipe/pin/${recipe.id}`}
                      className="btn btn--accent absolute pin-r mr-16 mt-20 sm:relative sm:pin-none sm:mt-0 sm:mr-0 no-underline"
                    >
                      <i className="fas fa-thumbtack icon" />
                      Enregistrer
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="btn btn--accent absolute pin-r mr-16 mt-20 sm:relative sm:pin-none sm:mt-0 sm:mr-0 no-underline"
                    >
                      <i className="fas fa-thumbtack icon" />
                      Enregistrer
                    </Link>
                  )}
                </div>

                <div className="flex flex-strech flex-col md:flex-row mb-4">
                  <div className="inline-flex items-center justify-center md:w-3/5 mx-0 p-4 pt-0">
                    <img
                      className="bg-grey-light rounded-lg"
                      src={recipe.imgUrl}
                      alt={recipe.title}
                    />
                  </div>
                  <div className="inline-block md:w-2/5 mx-0 px-4">
                    <RecipeUserInfos
                      userId={recipe.user}
                      boardId={recipe.board}
                    />
                    <h1 className="text-2xl sm:text-3xl mb-2">
                      {recipe.title}
                    </h1>
                    {recipe.keywords && (
                      <ul className="p-0">
                        {recipe.keywords.map((keyword, i) => (
                          <li
                            key={`keyword-${i}`}
                            className="inline-block block"
                          >
                            <Link
                              to="#!"
                              className="text-xs tracking-wide uppercase text-purple-dark no-underline pl-2 hover:text-purple-darker"
                            >
                              #{keyword}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                    {recipe.description && (
                      <p className="text-xl mt-4  border-grey-light">
                        {recipe.description}
                      </p>
                    )}
                    <ul className="py-5 mt-5 px-0 border-t border-b border-grey-light">
                      <li className="block mb-2 font-bold text-lg">
                        <i className="far fa-smile mr-2" />
                        Pour {recipe.quantity} personnes
                      </li>
                      <li className="block mb-2 font-bold text-lg">
                        <i className="far fa-clock mr-2" />
                        {recipe.time.hours && recipe.time.hours != 0
                          ? `${recipe.time.hours} h `
                          : null}

                        {recipe.time.minutes && recipe.time.minutes != 0
                          ? `${recipe.time.minutes} min`
                          : null}
                      </li>
                      <li className="block font-bold text-lg">
                        <i className="far fa-hand-peace mr-2" />
                        {recipe.difficulty === "very-easy"
                          ? "Très facile"
                          : recipe.difficulty === "easy"
                            ? "Facile"
                            : recipe.difficulty === "medium"
                              ? "Moyenne"
                              : "Difficile"}
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="inline-block px-4 border-b border-grey-light md:border-0 md:w-1/3 mx-0 align-top">
                  <List
                    title="Ingrédients"
                    icon="cookie-bite"
                    items={recipe.ingredients}
                  />

                  {recipe.ustensils && (
                    <List
                      title="Matériel"
                      icon="utensils"
                      items={recipe.ustensils}
                    />
                  )}
                </div>
                <div className="inline-block md:w-2/3 mx-0">
                  <List title="Préparation" items={recipe.steps} />
                </div>
              </div>
            )}

            {/* Placeholder waiting for data */}
            {!recipe && (
              <div>
                <div className="pr-4 mb-4 flex items-center">
                  <Link
                    to="/"
                    className="link absolute 
                    pin-l overflow-hidden pr-4 
                    -mt-20
                    lg:-mt-6
                    ml-4
                    text-black 
                    hover:bg-transparent
                    after:bg-grey-light"
                  >
                    <i className=" fas fa-chevron-left inline-block -ml-1 -mt-1 mr-2 text-2xl align-middle" />
                    <span> Accueil</span>
                  </Link>
                  <div className="btn-floating h-12 w-12 text-2xl mr-2 ml-2 bg-grey-lightest" />
                  <div className="btn-floating h-12 w-12 text-2xl mr-2 sm:hidden bg-grey-lightest" />
                  <div
                    className="hidden sm:inline-block btn ml-auto mr-2 w-32"
                    style={{ height: "43px" }}
                  />
                  <div
                    className="btn btn--accent absolute pin-r mr-16 mt-20 sm:relative sm:pin-none sm:mt-0 sm:mr-0 w-32"
                    style={{ height: "43px" }}
                  />
                </div>

                <div className="flex flex-strech flex-col md:flex-row mb-4">
                  <div className="inline-flex items-center justify-center md:w-3/5 mx-0 py-4 md:px-8 pt-0">
                    <div className="bg-grey-light rounded-lg w-full h-screen" />
                  </div>
                  <div className="inline-block md:w-2/5 mx-0 px-4">
                    <RecipeUserInfos userId="" boardId="" />
                    <h1 className="text-2xl sm:text-3xl mb-8">
                      <div className="w-full h-8 mb-2 bg-grey-light" />
                      <div className="w-full h-8 bg-grey-light" />
                    </h1>
                    <div className="text-xl pb-5 border-b border-grey-light">
                      <div className="w-full h-6 mb-2 bg-grey-light" />
                      <div className="w-full h-6 mb-2 bg-grey-light" />
                      <div className="w-full h-6 mb-2 bg-grey-light" />
                      <div className="w-full h-6 mb-2 bg-grey-light" />
                      <div className="w-full h-6 mb-2 bg-grey-light" />
                      <div className="w-full h-6 mb-2 bg-grey-light" />
                    </div>
                    <ul className="py-5 px-0  border-b border-grey-light">
                      <li className="block mb-2 font-bold text-lg">
                        <i className="far fa-smile mr-2" />
                        <div className="inline-block align-middle w-2/3 h-4  bg-grey-light" />
                      </li>
                      <li className="block mb-2 font-bold text-lg">
                        <i className="far fa-clock mr-2" />
                        <div className="inline-block align-middle w-1/3 h-4  bg-grey-light" />
                      </li>
                      <li className="block font-bold text-lg">
                        <i className="far fa-hand-peace mr-2" />
                        <div className="inline-block align-middle w-1/3 h-4  bg-grey-light" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="max-w-lg mx-auto text-2xl font-bold px-4">
          Plus de ce genre
        </div>
        {/* <Recipes recipes={recipes} /> */}
      </div>
    );
  }
}

Recipe.propTypes = {
  firestore: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
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
    recipeExists:
      !!ordered.recipe && !!ordered.recipe[0] && !!ordered.recipe[0].id,
    auth: firebase.auth
  }))
)(Recipe);
