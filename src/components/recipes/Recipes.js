import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";
import classnames from "classnames";

//Components
import Recipe from "./Recipe";

class Recipes extends Component {
  render() {
    const breakpointColumnsObj = {
      default: this.props.thin ? 3 : 6,
      1600: this.props.thin ? 3 : 5,
      1500: this.props.thin ? 3 : 4,
      1200: 3,
      850: 2,
      500: 1
    };

    const { recipes, thin, add } = this.props;

    const AddButton = (
      <Link
        to={{ pathname: "/recipe/add", state: { modal: true } }}
        className="group block w-full p-4 m-2 after:bg-grey-light no-underline"
      >
        <div className="flex items-center justify-center h-48 sm:h-96 bg-grey-lighter rounded-lg text-purple group-hover:text-purple-dark">
          <i className="fas fa-plus-circle text-5xl" />
        </div>
        <div className="mt-4 text-xl text-grey-dark font-bold group-hover:text-grey-darker">
          Créer une recette
        </div>
      </Link>
    );

    if (add && recipes && recipes[0] !== "add") {
      recipes.unshift("add");
    }

    if (recipes && recipes.length > 0) {
      return (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={classnames("flex mx-auto p-4 pr-6 pt-2", {
            "max-w-6xl": !thin,
            "max-w-2xl px-8 md:px-24 ": thin
          })}
          columnClassName={classnames("masonry-col", {
            "-ml-4 mr-4": thin
          })}
        >
          {recipes.map((recipe, i) => {
            if (recipe === "add") {
              return <div key="add-recipe">{AddButton}</div>;
            } else if (
              recipes.findIndex(
                checkRecipe => checkRecipe.imgUrl === recipe.imgUrl
              ) != i
            ) {
              //Check for duplicates
              return null;
            } else {
              return <Recipe key={recipe.id} recipe={recipe} />;
            }
          })}
        </Masonry>
      );
    } else if (recipes && recipes.length === 0) {
      // @todo add style
      return <div>Pas de recettes...</div>;
    } else {
      //@placeholder loading recipes
      return (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={classnames("flex mx-auto p-4 pr-6 pt-2", {
            "max-w-6xl": !thin,
            "max-w-2xl px-8 md:px-24 ": thin
          })}
          columnClassName={classnames("masonry-col", {
            "-ml-4 mr-4": thin
          })}
        >
          <Recipe />
          <Recipe />
          <Recipe />
          <Recipe />
          <Recipe />
          <Recipe />
          <Recipe />
          <Recipe />
        </Masonry>
      );
    }
  }
}

Recipes.propTypes = {
  recipes: PropTypes.array,
  add: PropTypes.bool
};

export default Recipes;
