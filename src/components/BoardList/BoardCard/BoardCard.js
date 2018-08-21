import React, { Component } from 'react';

//CSS
import './BoardCard.css'

//Components
import BoardTile from './BoardTile/BoardTile';

class BoardCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes : this.getRecipesImg()
    }

    this.getRecipesImg = this.getRecipesImg.bind(this);
  }

  getRecipesImg() {
    let recipes = [];

    this.props.board.recipes.map((recipeID, i) => {
      if (i < 3) {
        const recipeFound = this.props.recipes.find( recipe => recipe.id === recipeID);
        recipes.push(recipeFound.imgUrl);
      }
    })

    //Filling the board preview with empty tile if there is not enought recipe
    if (recipes.length < 3) {
      for (let i = recipes.length - 3; i < 0; i++) {
        recipes.push("");
      }
    }

    return recipes;
  }

  render() {
    return (
      <a href="#" className="board-card board-item">
        <div className="board-preview">
          {this.state.recipes.map((imgUrl, i) => {
            return <BoardTile key={`board-tile-${i}`} imgUrl={imgUrl} />
          })}
        </div>
        <p className="heading-6 board-title">{this.props.board.name}</p>
        <p className="text">{`${this.props.board.recipes.length} recette${this.props.board.recipes.length > 1 ? "s": ""}`} </p>
      </a>
    );
  }
}

export default BoardCard;