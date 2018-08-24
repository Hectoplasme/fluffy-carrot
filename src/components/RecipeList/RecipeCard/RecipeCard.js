import React, { Component } from 'react';
import sizeMe from 'react-sizeme';
import { Link } from "react-router-dom";

//CSS
import './RecipeCard.css';


class RecipeCard extends Component {
  render() {
    const { width } = this.props.size;
    const height = (width - 10) * this.props.height / this.props.width;
    
    return (
      <div className={`${this.props.className || ""} card`}>
        <Link to="/recipe/pouet" className="card-wrapper">
          <img className="card-thumbnail" height={height} src={this.props.imgUrl} alt=""/>
          <p className="card-title bold">{this.props.title}</p>
        </Link>
      </div>
    );
  }
}

export default sizeMe()(RecipeCard);
