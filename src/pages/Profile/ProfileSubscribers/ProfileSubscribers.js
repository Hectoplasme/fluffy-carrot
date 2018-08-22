import React, { Component } from 'react';

//Components
import UserList from '../../../components/UserList/UserList';

class ProfileSubscribers extends Component {
  render() {
    return (
      <div className="board-list container container--thin">
        <UserList />
      </div>
    );
  }
}

export default ProfileSubscribers;