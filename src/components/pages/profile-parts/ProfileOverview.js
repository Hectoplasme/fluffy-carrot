import React, { Component } from "react";
import { Link } from "react-router-dom";
//Components
import Recipes from "../../recipes/Recipes";
import Boards from "../../boards/Boards";

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

class ProfileOverview extends Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <div>
        <div className="flex items-center justify-between max-w-2xl mx-auto px-8 md:px-24">
          <h2 className="text-2xl w-4/5">Recettes les plus récentes</h2>
          <Link to={`/${id}/recipes`} className="btn-floating -mr-4">
            <i className="fas fa-chevron-right icon" />
          </Link>
        </div>
        <Recipes thin recipes={recipes} />

        <div className="flex items-center justify-between max-w-2xl mx-auto px-8 md:px-24">
          <h2 className="text-2xl w-4/5">Tableaux les plus récents</h2>
          <Link to={`/${id}/boards`} className="btn-floating -mr-4">
            <i className="fas fa-chevron-right icon" />
          </Link>
        </div>
        <Boards thin boards={recipes} />
      </div>
    );
  }
}

export default ProfileOverview;
