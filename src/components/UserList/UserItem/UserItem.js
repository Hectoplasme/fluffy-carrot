import React, { Component } from 'react';

//CSS
import './UserItem.css';

class UserItem extends Component {
  render() {
    return (
      <div className="user-item">
        <div class="avatar user-avatar" style={{
          background : `url(${"https://picsum.photos/200/300/?random"}`,
          backgroundSize: "cover"
        }}></div>
        <p class="user-name heading-6">Studio Pouet </p>
        <div class="user-btn">
          <button class="btn btn--accent">Se désabonner</button>
        </div>
      </div>
    );
  }
}

export default UserItem;