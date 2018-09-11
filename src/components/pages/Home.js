import React, { Component } from "react";
import PropTypes from "prop-types";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

//Component
import Recipes from "../recipes/Recipes";
import Spinner from "../layout/Spinner";

class Home extends Component {
  render() {
    const { recipes } = this.props;

    if (recipes) {
      return (
        <div>
          <Recipes recipes={recipes} />
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Home.propTypes = {
  firestore: PropTypes.object.isRequired,
  recipes: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "recipes" }]),
  connect((state, props) => ({
    recipes: state.firestore.ordered.recipes
  }))
)(Home);
