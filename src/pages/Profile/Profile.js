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
      id: this.props.match.params.id,
      user : this.getProfileUser(this.props.match.params.id)
    }

    this.getProfileUser = this.getProfileUser.bind(this);
  }

  getProfileUser(id) {
    return this.props.data.users.find(user => user.id === id);
  }

  render() {
    return (
      <div className="main main-profile">
        <ProfileHeader 
          data={this.props.data.recipes} 
          user={this.state.user} />
        <SubNav id={this.state.id}/>

        <div className="container--thin">
          <Route exact path="/:id" render={(props) => (
            <ProfileOverview 
              recipes={this.props.data.recipes}
              user={this.state.user} 
              {...props} />
          )} />
          
          <Route path="/:id/boards" render={(props) => (
            <ProfileBoards />
          )} />

          <Route path="/:id/recipes" render={(props) => (
            <ProfileRecipes />
          )} />

          <Route path="/:id/subscribers" render={(props) => (
            <ProfileSubscribers />
          )} />

          <Route path="/:id/subscriptions" render={(props) => (
            <ProfileSubscriptions />
          )} />


        </div>
        
      </div>
    );
  }
}

export default Profile;