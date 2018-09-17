import React, { Component } from "react";
import PropTypes from "prop-types";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

//Components
import Recipes from "../recipes/Recipes";

class Home extends Component {
  render() {
    const { recipes } = this.props;
    if (recipes) {
      return (
        <div>
          {/* <h1>Recettes les plus récentes</h1> */}
          <Recipes recipes={recipes} />
        </div>
      );
    } else {
      return (
        <div>
          <Recipes />
        </div>
      );
    }
  }
}

Home.propTypes = {
  firestore: PropTypes.object.isRequired,
  recipes: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "recipes", limit: 30 }]),
  connect(({ firestore }) => ({
    recipes: firestore.ordered.recipes
  }))
)(Home);
