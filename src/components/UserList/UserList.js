import React, { Component } from 'react';

//CSS
import './UserList.css';

//Components
import UserItem from './UserItem/UserItem';

class UserList extends Component {
  render() {
    return (
      <div className="user-list">
        {this.props.users.map((user, i) => {
          return <UserItem key={`sub-${i}`} {...user} />
        })}
      </div>
    );
  }
}

export default UserList;