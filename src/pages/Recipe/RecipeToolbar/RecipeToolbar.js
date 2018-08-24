import React, { Component } from 'react';

//CSS
import './RecipeToolbar.css';

class RecipeToolbar extends Component {
  render() {
    return (      
      <div className="container container--thin">
        <div className="recipe-toolbar">
          <a href="#" className="link link-back">
            <i className="icon icon-large fas fa-chevron-left"></i>
            <span className="link-back-text"> Accueil</span>
          </a>
          <div className="recipe-toolbar-icons">
            <button className="btn btn-floating">
              <i className="icon fas fa-pen"></i>
            </button>
            <button className="btn btn-floating only-on-mobile">
              <i className="icon fas fa-share-alt"></i>
            </button>
            <button className="btn btn-floating only-on-mobile">
              <i className="icon icon-accent fas fa-bookmark"></i>
            </button>
          </div>
          <button className="btn btn--accent hidden-on-mobile float-right">
            <i className="icon fas fa-bookmark"></i> Enregistrer
          </button>
          <button className="btn hidden-on-mobile float-right">
            <i className="icon fas fa-share-alt"></i>Partager
          </button>
        </div>
      </div>
    );
  }
}

export default RecipeToolbar;