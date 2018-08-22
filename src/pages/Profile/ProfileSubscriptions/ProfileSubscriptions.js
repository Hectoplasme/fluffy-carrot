import React, { Component } from 'react';

//Components
import UserList from '../../../components/UserList/UserList';

class ProfileSubscriptions extends Component {
  render() {
    return (
      <div className="profile-subscriptions container container--thin">
        <UserList users={this.props.users}/>
      </div>
    );
  }
}

export default ProfileSubscriptions;