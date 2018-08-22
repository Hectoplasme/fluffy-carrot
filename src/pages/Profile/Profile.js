import React, { Component } from 'react';
import { Route } from 'react-router-dom';

//CSS
import "./Profile.css";

//Components
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import SubNav from '../../components/SubNav/SubNav';

//Template parts
import ProfileOverview from './ProfileOverview/ProfileOverview';
import ProfileBoards from './ProfileBoards/ProfileBoards';
import ProfileRecipes from './ProfileRecipes/ProfileRecipes';
import ProfileSubscribers from './ProfileSubscribers/ProfileSubscribers';
import ProfileSubscriptions from './ProfileSubscriptions/ProfileSubscriptions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user : this.getProfileUser(this.props.match.params.id),
      dataRecipes : this.getUserRecipes(),
      dataSubscribers : this.getUserSubscribers(),
      dataSubscriptions : this.getUserSubscriptions()
    }

    this.getProfileUser = this.getProfileUser.bind(this);
    this.getUserRecipes = this.getUserRecipes.bind(this);
    this.getUserSubscribers = this.getUserSubscribers.bind(this);
    this.getUserSubscriptions = this.getUserSubscriptions.bind(this);

  }

  getProfileUser(id) {
    return this.props.data.users.find(user => user.id === id);
  }

  getUserRecipes() {
    let recipes = [];

    //Get all the recipes Objects Items from the id references 
    this.getProfileUser(this.props.match.params.id).recipes.map((recipeID, i) => {
      if (i < 18) {
        const recipeFound = this.props.data.recipes.find( recipe => recipe.id === recipeID);
        recipes.push(recipeFound);
      }
    })

    return recipes;
  }

  getUserSubscribers() {
    let subscribers = [];

    //Get all the subscribers Objects Items from the id references 
    this.getProfileUser(this.props.match.params.id).subscribers.map((userID, i) => {
      
        const userFound = this.props.data.users.find( user => user.id === userID);
        subscribers.push(userFound);
      
    })

    return subscribers;
  }
  
  getUserSubscriptions() {
    let subscriptions = [];

    //Get all the subscriptions Objects Items from the id references 
    this.getProfileUser(this.props.match.params.id).subscriptions.map((userID, i) => {
      
        const userFound = this.props.data.users.find( user => user.id === userID);
        subscriptions.push(userFound);
      
    })

    return subscriptions;
  }

  render() {
    return (
      <div className="main main-profile">
        <ProfileHeader 
          recipes={this.state.dataRecipes} 
          user={this.state.user} />
        <SubNav id={this.state.user.id}/>

          <Route exact path="/:id" render={(props) => (
            <ProfileOverview 
              recipes={this.state.dataRecipes}
              user={this.state.user} 
              {...props} />
          )} />
          
          <Route path="/:id/boards" render={(props) => (
            <ProfileBoards 
              recipes={this.state.dataRecipes}
              user={this.state.user}
              {...props} />
          )} />

          <Route path="/:id/recipes" render={(props) => (
            <ProfileRecipes 
              recipes={this.state.dataRecipes}
              user={this.state.user}
              {...props} />
          )} />

          <Route path="/:id/subscribers" render={(props) => (
            <ProfileSubscribers 
              users={this.state.dataSubscribers}
              {...props}/>
          )} />

          <Route path="/:id/subscriptions" render={(props) => (
            <ProfileSubscriptions 
              users={this.state.dataSubscriptions}
              {...props} />
          )} />


        
      </div>
    );
  }
}

export default Profile;