import React, { Component } from 'react';

//CSS
import './AddButton.css';

class AddButton extends Component {
  render() {
    return (
      <div className={`add-button ${this.props.board ? "board-item" : "recipe-item"}`}>
          <a href="#" className="button-wrapper">
            <div className="button-thumbnail">
              <i className="icon icon-accent fas fa-plus-circle"></i>
            </div>
            <p className="button-title bold">{this.props.board ? "Créer un tableau" : "Créer une recette"}</p>
          </a>
        </div>
    );
  }
}

export default AddButton;