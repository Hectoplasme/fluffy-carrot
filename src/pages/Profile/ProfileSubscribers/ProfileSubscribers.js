import React, { Component } from 'react';

//Components
import UserList from '../../../components/UserList/UserList';

class ProfileSubscribers extends Component {
  render() {
    return (
      <div className="profile-subscribers container container--thin">
        <UserList users={this.props.users}/>
      </div>
    );
  }
}

export default ProfileSubscribers;