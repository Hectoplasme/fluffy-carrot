import React, { Component } from 'react';

//Components
import BoardList from "../../../components/BoardList/BoardList";

class ProfileBoards extends Component {
  render() {
    return (
      <div className="profile-board-list container">
        <BoardList 
          addEnable
          recipes={this.props.recipes} 
          boards={this.props.user.boards}/>
      </div>
    );
  }
}

export default ProfileBoards;