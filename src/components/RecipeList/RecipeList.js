import React, { Component } from 'react';
import './RecipeList.css';
import RecipeCard from './RecipeCard/RecipeCard';


class RecipeList extends Component {
  render() {
    return (
        <div className={`${this.props.className || ""} card-list`}>
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
        </div>
    );
  }
}

export default RecipeList;