import React, { Component } from 'react';

//CSS
import './TiledRecipesContainer.css'

//Components
import Tile from './Tile/Tile';

class TiledRecipesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgUrl : this.shuffle(this.getImgUrl())
    }

    this.getImgUrl = this.getImgUrl.bind(this);
    this.shuffle = this.shuffle.bind(this);
  }

  getImgUrl() {
    let recipes = [];

    //Get all the recipes Url from the id references 
    this.props.recipes.map((recipeID) => {
      const recipeFound = this.props.data.find( recipe => recipe.id === recipeID);
      recipes.push(recipeFound.imgUrl);
    })

    //Check if the recipes array is long enough to fill the header
    if (recipes.length > 260) {
      recipes.slice(0, 259);
    } else if (recipes.length > 0) {
      //Fill the array to fill the header
      this.shuffle(recipes);
      let newRecipesArray = [];
      for (let i = 0; i < 260 / recipes.length; i++) {
        newRecipesArray = [...newRecipesArray, ...recipes];
      }
      recipes = newRecipesArray;
    }

    return recipes;
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }


  render() {
    return (
      <div className="tiled-header">
        <div className="tile-wrapper">
          { this.state.imgUrl.map((imgUrl, i) => {
            return <Tile key={`tile-${i}`} img={imgUrl} />
          }) }
        </div>
      </div>
    );
  }
}

export default TiledRecipesContainer;