import React, { Component } from "react";
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

class Home extends Component {
  render() {
    return (
      <div>
        <Recipes recipes={recipes} />
      </div>
    );
  }
}

export default Home;
