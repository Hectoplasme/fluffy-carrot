import React, { Component } from 'react';

//CSS
import './ProfileOverview.css'

//Components
import RecipeList from "../../../components/RecipeList/RecipeList";
import BoardList from "../../../components/BoardList/BoardList";

class ProfileOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes : this.getUserRecipes()
    }

    this.getUserRecipes = this.getUserRecipes.bind(this);
  }

  getUserRecipes() {
    let recipes = [];

    //Get all the recipes Url from the id references 
    this.props.user.recipes.map((recipeID, i) => {
      if (i < 18) {
        const recipeFound = this.props.recipes.find( recipe => recipe.id === recipeID);
        recipes.push(recipeFound);
      }
    })

    return recipes;
  }

  render() {
    return (
      <div className="profile-overview">
        <div className="profile-title">
          <p className="heading heading-6">Recettes les plus récentes</p>
          <a href="#" className="btn btn-floating"><i className="icon icon-large fas fa-chevron-right"></i></a>
        </div>
        <RecipeList thin recipes={this.state.recipes} />
        
        <div className="profile-title">
          <p className="heading heading-6">Tableaux les plus récents</p>
          <a href="#" className="btn btn-floating"><i className="icon icon-large fas fa-chevron-right"></i></a>
        </div>
        <BoardList />
      </div>
    );
  }
}

export default ProfileOverview;