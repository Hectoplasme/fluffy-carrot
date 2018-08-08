import React, { Component } from 'react';
import './RecipeCard.css';
import imgUrl1 from "../../../images/placeholder_1.JPG";
import imgUrl2 from "../../../images/placeholder_4.jpg";
import imgUrl3 from "../../../images/placeholder_3.JPG";


class RecipeCard extends Component {
  render() {
    const random = Math.floor(Math.random() * 100);
    return (
      <div className={`${this.props.className || ""} card`}>
        <a href="#" className="card-wrapper">
          <img className="card-thumbnail" src={random > 50 ? imgUrl1: random < 25 ? imgUrl2 : imgUrl3} alt=""/>
          <p className="card-title bold">Pâtes à la carbonara</p>
        </a>
      </div>
    );
  }
}

export default RecipeCard;
