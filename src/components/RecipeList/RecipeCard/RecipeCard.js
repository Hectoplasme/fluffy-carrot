import React, { Component } from 'react';
import sizeMe from 'react-sizeme';

//CSS
import './RecipeCard.css';


class RecipeCard extends Component {
  render() {
    const { width } = this.props.size;
    const height = (width - 10) * this.props.height / this.props.width;
    
    return (
      <div className={`${this.props.className || ""} card`}>
        <a href="#" className="card-wrapper">
          <img className="card-thumbnail" height={height} src={this.props.imgUrl} alt=""/>
          <p className="card-title bold">{this.props.title}</p>
        </a>
      </div>
    );
  }
}

export default sizeMe()(RecipeCard);
