import React, { Component } from 'react';

//Components
import RecipeList from "../../../components/RecipeList/RecipeList";


class ProfileRecipes extends Component {
  render() {
    return (
      <div className="profile-recipes-list clear">
        <RecipeList 
          thin 
          recipes={this.props.recipes} />
      </div>
    );
  }
}

export default ProfileRecipes;