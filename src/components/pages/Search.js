import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

//Components
import Recipes from "../recipes/Recipes";
class Search extends Component {
  render() {
    const { recipes } = this.props;
    if (recipes && recipes.length > 0) {
      return (
        <div>
          <div className="max-w-6xl mx-auto  px-12 pt-8 pb-2">
            <h1 className="text-3xl sm:text-5xl font-bold">
              Résultats pour : {this.props.match.params.keyword}
            </h1>
          </div>
          <Recipes recipes={recipes} />
        </div>
      );
    } else if (recipes && recipes.length === 0) {
      return (
        <div>
          <div className="max-w-6xl mx-auto  px-12 pt-8 pb-2">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">
              Résultats pour : {this.props.match.params.keyword}
            </h1>
            <p className="leading-normal">
              Il ne semble pas y avoir de recette correspondant à cette
              recherche
            </p>
            <div className="mt-4 ">
              <Link to="/" className="link font-normal text-purple-dark -ml-4">
                <i className="fas fa-chevron-left icon mr-4" />
                Retour à l'acceuil
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="max-w-6xl mx-auto  px-12 pt-8 pb-2">
            <h1 className="text-3xl sm:text-5xl font-bold">
              Résultats pour : {this.props.match.params.keyword}
            </h1>
          </div>
          <Recipes />
        </div>
      );
    }
  }
}

Search.propTypes = {
  firestore: PropTypes.object.isRequired,
  recipes: PropTypes.array
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "recipes",
      limit: 30,
      where: [["keywords", "array-contains", props.match.params.keyword]],
      storeAs: "searchRecipes"
    }
  ]),
  connect(({ firestore }) => ({
    recipes: firestore.ordered.searchRecipes
  }))
)(Search);
