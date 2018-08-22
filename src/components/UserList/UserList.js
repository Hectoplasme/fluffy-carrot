import React, { Component } from 'react';

//CSS
import './UserList.css';

//Components
import UserItem from './UserItem/UserItem';

class UserList extends Component {
  render() {
    return (
      <div className="user-list">
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
      </div>
    );
  }
}

export default UserList;