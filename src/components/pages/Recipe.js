import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";

//Components
import Recipes from "../recipes/Recipes";
import List from "../layout/List";

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: {},
      user: {},
      board: {},
      userLoaded: false,
      boardLoaded: false,
      recipeExists: true,
      moreRecipes: []
    };
  }

  componentWillReceiveProps(nextProps) {
    const { firestore } = this.props;

    //Check if the route changes
    if (nextProps.match.params.recipeId !== this.props.match.params.recipeId) {
      window.scrollTo(0, 0);
      firestore
        .get({ collection: "recipes", doc: nextProps.match.params.recipeId })
        .then(res => {
          this.updateRecipe(res, true);
        });
    }
  }

  componentDidMount() {
    const { recipeExists, recipe } = this.state;
    const { firestore } = this.props;

    //Check if the recipe exist
    if (!recipe && recipeExists) {
      firestore
        .get({ collection: "recipes", doc: this.props.match.params.recipeId })
        .then(res => {
          this.updateRecipe(res, false);
        });
    }

    //get the recipe and listen the change
    firestore.setListener(
      { collection: "recipes", doc: this.props.match.params.recipeId },
      res => this.updateRecipe(res, false)
    );
  }

  componentWillUnmount() {
    const { firestore } = this.props;

    firestore.unsetListener(
      { collection: "recipes", doc: this.props.match.params.recipeId },
      res => this.updateRecipe(res, false)
    );
  }

  updateRecipe = (res, updating) => {
    if (res.data()) {
      this.fetchBoard(res.data().board);
      this.fetchUser(res.data().user);
      this.findRecipes(res.data().keywords, res, updating);
      this.setState({ recipe: { id: res.id, ...res.data() } });
    } else {
      this.setState({ recipeExists: false });
    }
  };

  fetchBoard = boardId => {
    const { firestore } = this.props;

    firestore.get({ collection: "boards", doc: boardId }).then(res => {
      if (res.data()) {
        this.setState({
          board: { id: res.id, ...res.data() },
          boardLoaded: true
        });
      }
    });
  };

  fetchUser = userSlug => {
    const { firestore } = this.props;

    firestore
      .get({ collection: "users", where: ["slug", "==", userSlug] })
      .then(res => {
        if (res.docs) {
          this.setState({
            user: { id: res.docs[0].id, ...res.docs[0].data() },
            userLoaded: true
          });
        }
      });
  };

  findRecipes(keywords, recipeRes, updating) {
    const { firestore } = this.props;
    const { moreRecipes } = this.state;
    let isUpdating = updating;

    keywords.forEach(keyword => {
      if (moreRecipes.length < 15) {
        firestore
          .get({
            collection: "recipes",
            where: [["keywords", "array-contains", keyword]]
          })
          .then(res => {
            if (res.docs) {
              res.docs.forEach(doc => {
                if (
                  this.state.moreRecipes.find(recipe => recipe.id === doc.id) ||
                  doc.id === recipeRes.id ||
                  doc.data().imgUrl === recipeRes.data().imgUrl
                ) {
                  // console.log(Don't show the recipe);
                } else {
                  if (isUpdating) {
                    isUpdating = false;
                    this.setState({
                      moreRecipes: [{ id: doc.id, ...doc.data() }]
                    });
                  } else {
                    this.setState({
                      moreRecipes: [
                        ...this.state.moreRecipes,
                        { id: doc.id, ...doc.data() }
                      ]
                    });
                  }
                }
              });
            }
          });
      }
    });

    // console.log(keywords);
  }

  render() {
    const { recipeExists, user, board, recipe, moreRecipes } = this.state;
    const { profile } = this.props;
    if (recipe.id && recipeExists && board && user) {
      return (
        <div
          className="bg-grey-light min-h-screen pt-8"
          style={{
            background: "linear-gradient(#dae1e7, white)"
          }}
        >
          <div className="px-4">
            <div className="max-w-lg mx-auto p-4 pb-4 bg-white rounded-lg mx-4 mt-12 mb-20 lg:mt-0">
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

                  {profile &&
                    profile.slug === board.author && (
                      <Link
                        to={`/recipe/edit/${recipe.id}`}
                        className="btn-floating h-12 w-12 text-2xl mr-2 ml-2"
                      >
                        <i className="fas fa-pen icon" />
                      </Link>
                    )}

                  <Link
                    to={
                      profile && profile.slug ? `/pin/${recipe.id}` : "/login"
                    }
                    className="btn btn--accent absolute pin-r mr-16 mt-20 sm:relative sm:pin-none sm:mt-0 sm:mr-0 no-underline ml-auto"
                  >
                    <i className="fas fa-thumbtack icon" />
                    Enregistrer
                  </Link>
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
                    {/* User and board infos */}
                    <div className="flex items-center mb-4">
                      <Link
                        to={`/${user.slug}`}
                        className="flex-no-shrink h-12 w-12 sm:h-16 sm:w-16 mr-2 md:mr-4 rounded-full bg-grey-light"
                        style={{
                          background: "#dae1e7",
                          backgroundImage: ` url(${user.avatar})`,
                          backgroundSize: "cover"
                        }}
                      />
                      <div>
                        <Link
                          to={`/${user.slug}`}
                          className="font-bold no-underline text-black"
                        >
                          {user.slug === profile.slug ? "Vous" : user.username}
                        </Link>{" "}
                        {user.slug === profile.slug ? "avez" : "a"} enregistré
                        cette recette dans{" "}
                        <Link
                          to={`/${user.slug}/board/${board.id}`}
                          className="font-bold no-underline text-black"
                        >
                          {board.title}
                        </Link>
                      </div>
                    </div>

                    {/* @field title */}
                    <h1 className="text-2xl sm:text-3xl mb-2">
                      {recipe.title}
                    </h1>
                    {/* @field keywords */}
                    {recipe.keywords && (
                      <ul className="p-0">
                        {recipe.keywords.map((keyword, i) => (
                          <li
                            key={`keyword-${i}`}
                            className="inline-block block"
                          >
                            <Link
                              to={`/search/${keyword}`}
                              className="text-xs tracking-wide uppercase text-purple-dark no-underline pl-2 hover:text-purple-darker"
                            >
                              #{keyword}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                    {/* @field description */}
                    {recipe.description && (
                      <p className="text-xl mt-4  border-grey-light">
                        {recipe.description}
                      </p>
                    )}

                    {/* @fields recipe infos */}
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
                <div className="block px-4 border-b border-grey-light md:border-0 md:w-1/3 mx-4 md:mx-0 md:inline-block align-top pb-2">
                  {/* @field ingredients */}
                  <List
                    title="Ingrédients"
                    icon="cookie-bite"
                    items={recipe.ingredients}
                  />
                  {/* @field ustensils */}

                  {recipe.ustensils.length > 0 && (
                    <List
                      title="Matériel"
                      icon="utensils"
                      items={recipe.ustensils}
                    />
                  )}
                </div>
                {/* @field steps */}
                <div className="inline-block w-full md:w-2/3 mx-4 md:mx-0">
                  <List title="Préparation" items={recipe.steps} />
                </div>
              </div>
            </div>
          </div>

          {moreRecipes.length > 0 && (
            <div>
              <div className="max-w-lg mx-auto text-2xl font-bold px-4">
                Plus de ce genre
              </div>
              <Recipes recipes={moreRecipes} />
            </div>
          )}
        </div>
      );
    } else if (!recipeExists) {
      return <div>Cette recette n'existe pas</div>;
    } else {
      // @Placeholder loading single recipe..
      return (
        <div
          className="bg-grey-light min-h-screen pt-8"
          style={{
            background: "linear-gradient(#dae1e7, white)"
          }}
        >
          <div className="px-4">
            <div className="max-w-lg mx-auto p-4 pb-4 bg-white rounded-lg mx-4 mt-12 mb-20 lg:mt-0">
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
                  <div className="bg-grey-light rounded-lg w-full h-screen mx-4" />
                </div>
                <div className="inline-block md:w-2/5 mx-0 px-4">
                  <div className="flex items-center mb-4">
                    <div className="flex-no-shrink h-12 w-12 sm:h-16 sm:w-16 mr-2 md:mr-4 rounded-full bg-grey-light" />
                    <div className="relative flex-grow">
                      <div className="w-full h-3 mb-2 bg-grey-light" />
                      <div className="w-full h-3 mb-2 bg-grey-light" />
                      <div className="w-full h-3  bg-grey-light" />
                    </div>
                  </div>
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
          </div>
        </div>
      );
    }
  }
}

Recipe.propTypes = {
  firestore: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  profile: PropTypes.object
};

export default compose(
  firestoreConnect(),
  firebaseConnect(),
  connect(({ firestore: { ordered }, firebase }) => ({
    profile: firebase.profile
  }))
)(Recipe);
