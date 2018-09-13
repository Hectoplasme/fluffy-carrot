import React, { Component } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

class Recipe extends Component {
  render() {
    const { id, imgUrl, title } = this.props;

    if (id) {
      return (
        <Link
          to={`/recipe/${id}`}
          className="group inline-block w-full m-2 p-4 after:bg-grey-light no-underline focus:outline-none"
        >
          <button className="btn btn--accent absolute z-10 pin-t pin-r mt-8 mr-8 p-3 hidden group-hover:block">
            <i className="fas fa-thumbtack icon" />
            Enregistrer
          </button>
          <img
            className="block h-auto w-full max-w-full rounded-lg bg-grey-light"
            src={imgUrl}
          />
          <div className="mt-4 text-black font-bold">{title}</div>
          <button className="btn-floating btn-floating--sm absolute z-10 block pin-r pin-b mr-5 mb-2 hover:bg-grey hover:text-grey-darkest hidden group-hover:block">
            <i className="fas fa-pen icon align-middle" />
          </button>
        </Link>
      );
    } else {
      return (
        <div className="group inline-block w-full m-2 p-4 after:bg-grey-light no-underline focus:outline-none cursor-default">
          <div
            className="block h-auto w-full max-w-full rounded-lg bg-grey-light"
            style={{
              height: `${Math.random() * 400 + 200}px`
            }}
          />
          <div
            className="bg-grey h-4 mt-4"
            style={{
              width: `${Math.random() * 80 + 20}%`
            }}
          />
        </div>
      );
    }
  }
}

Recipe.propTypes = {
  id: PropTypes.string,
  imgUrl: PropTypes.string,
  title: PropTypes.string
};

export default Recipe;
