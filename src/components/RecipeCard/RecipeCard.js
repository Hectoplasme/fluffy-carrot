import React, { Component } from 'react';
import './RecipeCard.css';


class RecipeCard extends Component {
  render() {
    return (
      <div className={`${this.props.className || ""} card`}>
        
      </div>
    );
  }
}

export default RecipeCard;
