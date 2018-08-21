import React, { Component } from 'react';

//CSS
import './ProfileOverview.css'

//Components
import RecipeList from "../../../components/RecipeList/RecipeList";
import BoardList from "../../../components/BoardList/BoardList";

class ProfileOverview extends Component {
  render() {
    return (
      <div className="profile-overview container container--thin">
        <div className="profile-title">
          <p className="heading heading-6">Recettes les plus récentes</p>
          <a href="#" className="btn btn-floating"><i className="icon icon-large fas fa-chevron-right"></i></a>
        </div>
        <RecipeList 
          thin 
          recipes={this.props.recipes} />
        
        <div className="profile-title">
          <p className="heading heading-6">Tableaux les plus récents</p>
          <a href="#" className="btn btn-floating"><i className="icon icon-large fas fa-chevron-right"></i></a>
        </div>
        <BoardList 
          recipes={this.props.recipes} 
          boards={this.props.user.boards}/>
      </div>
    );
  }
}

export default ProfileOverview;