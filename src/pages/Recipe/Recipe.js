import React, { Component } from 'react';

//CSS
import './Recipe.css';

//Components
import RecipeToolbar from './RecipeToolbar/RecipeToolbar';
import RecipeInfos from './RecipeInfos/RecipeInfos';
import RecipeMetadata from './RecipeMetadata/RecipeMetadata';

class Recipe extends Component {
  render() {
    return (
      <div className="main main-recipe">
        <RecipeToolbar />
        <div className="container container--thin">
          <div className="recipe-header">
            <div className="recipe-left">
              <img src="https://picsum.photos/800/800/?random" className="recipe-img"/>
            </div>
            <div className="recipe-right">
              <RecipeMetadata />
              <h1 className="recipe-title heading-6">Pâtes à la carbonara</h1>
              <p className="recipe-description text border-bottom">Ces petits champignons sont totalement vegans et parfaits pour des apéros sains. L'avocat riche en bonne graisse et les champignons riches en fibres font de ces petites bouchées un apéro très rassasiant pour un Indice Glycémique quasi nul.</p>
              <RecipeInfos />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Recipe;