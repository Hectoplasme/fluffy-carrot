import React, { Component } from 'react';

//Components
import RecipeList from "../../../components/RecipeList/RecipeList";


class ProfileRecipes extends Component {
  render() {
    return (
      <div className="profile-recipes-list container">
        <RecipeList 
          recipes={this.props.recipes} />
      </div>
    );
  }
}

export default ProfileRecipes;