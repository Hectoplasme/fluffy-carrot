import React, { Component } from 'react';

//CSS
import './RecipeMetadata.css';

class RecipeMetadata extends Component {
  render() {
    return (      
      <div className="recipe-metadata border-bottom">
        <div className="recipe-metadata-left">
          <img src="https://picsum.photos/400/400/?random" alt="" className="avatar avatar--small"/>
        </div>
        <div className="recipe-metadata-right">
          <span className="bold">Vous</span> avez enregistré cette recette dans <span className="bold">Recette de pâtes</span>
        </div>
      </div>
    );
  }
}

export default RecipeMetadata;