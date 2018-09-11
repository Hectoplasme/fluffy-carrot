import React, { Component } from "react";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

//Components
import Recipes from "../recipes/Recipes";

//Data placeholder
const recipes = [
  {
    id: "recipe-1",
    title: "Pâtes à la carbonara",
    imgUrl: "https://picsum.photos/200/300/?random",
    height: 300,
    width: 200
  },
  {
    id: "recipe-2",
    title: "Pâtes bolognaise",
    imgUrl: "https://picsum.photos/500/500/?random",
    height: 500,
    width: 500
  },
  {
    id: "recipe-3",
    title: "Risotto au poulet",
    imgUrl: "https://picsum.photos/300/400/?random",
    height: 400,
    width: 300
  },
  {
    id: "recipe-4",
    title: "Risotto aux champignons",
    imgUrl: "https://picsum.photos/200/400/?random",
    height: 400,
    width: 200
  },
  {
    id: "recipe-5",
    title: "Pâtes à la carbonara",
    imgUrl: "https://picsum.photos/200/300/?random",
    height: 300,
    width: 200
  }
];

class Board extends Component {
  render() {
    return (
      <div>
        <div className="max-w-lg p-8 mx-auto mb-4">
          <div className="mb-4">
            <button className="btn-floating h-12 w-12 text-2xl mr-2 ">
              <i className="fas fa-pen icon" />
            </button>
            <button className="btn-floating h-12 w-12 text-2xl ">
              <i className="fas fa-share-alt icon" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="w-4/5 pr-4">
              <h1 className="text-5xl mb-2">Recettes de pâtes</h1>
              <p className="text-grey-darker">5 recettes</p>
            </div>
            <Link
              to="/user"
              className="hidden sm:block h-16 w-16 rounded-full"
              style={{
                background: `#dae1e7 url(https://picsum.photos/300/400/?random)`,
                backgroundSize: "cover"
              }}
            />
          </div>
        </div>
        <Recipes recipes={recipes} />
      </div>
    );
  }
}

export default Board;
