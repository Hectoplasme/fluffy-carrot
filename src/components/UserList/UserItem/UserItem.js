import React, { Component } from 'react';

//CSS
import './UserItem.css';

class UserItem extends Component {
  render() {
    return (
      <div className="user-item">
        <div class="avatar user-avatar" style={{
          background : `url(${this.props.avatar}`,
          backgroundSize: "cover"
        }}></div>
        <p class="user-name heading-6">{this.props.username}</p>
        <div class="user-btn">
          <button class="btn btn--accent">S'abonner</button>
        </div>
      </div>
    );
  }
}

export default UserItem;