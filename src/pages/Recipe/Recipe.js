import React, { Component } from 'react';

//CSS
import './Recipe.css';

//Components
import RecipeToolbar from './RecipeToolbar/RecipeToolbar';

class Recipe extends Component {
  render() {
    return (
      <div className="main main-recipe">
        <RecipeToolbar />
        <div className="container container--thin">
          <div className="recipe-header">
            <div className="recipe-left">
              <img src="https://picsum.photos/800/500/?random" className="recipe-img"/>
            </div>
            <div className="recipe-right">
              <h1 className="recipe-title heading-6">Pâtes à la carbonara</h1>
              <p className="recipe-description text border-bottom">Ces petits champignons sont totalement vegans et parfaits pour des apéros sains. L'avocat riche en bonne graisse et les champignons riches en fibres dont de ces petites bouchées un apéro très rassasiant pour un Indice Glycémique quasi nul.</p>
              <div class="recipe-infos border-bottom">
                <div class="recipe-infos-items">
                  <i className="icon fas fa-smile"></i>
                  <span className="recipe-infos-content bold">Pour 4 personnes</span>
                </div>
                <div class="recipe-infos-items">
                  <i className="icon fas fa-clock"></i>
                  <span className="recipe-infos-content bold">23 min</span>
                </div>
                <div class="recipe-infos-items">
                  <i className="icon fas fa-balance-scale"></i>
                  <span className="recipe-infos-content bold">Facile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Recipe;