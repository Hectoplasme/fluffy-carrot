import React, { Component } from 'react';

//CSS
import './RecipeInfos.css';

class RecipeInfos extends Component {
  render() {
    return (      
      <div className="recipe-infos border-bottom">
        <div className="recipe-infos-items">
          <i className="icon far fa-smile"></i>
          <span className="recipe-infos-content">Pour 4 personnes</span>
        </div>
        <div className="recipe-infos-items">
          <i className="icon far fa-clock"></i>
          <span className="recipe-infos-content">23 min</span>
        </div>
        <div className="recipe-infos-items">
          <i className="icon far fa-hand-peace"></i>
          <span className="recipe-infos-content">Facile</span>
        </div>
      </div>
    );
  }
}

export default RecipeInfos;