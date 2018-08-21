import React, { Component } from 'react';

//Components
import BoardList from "../../../components/BoardList/BoardList";

class ProfileBoards extends Component {
  render() {
    return (
      <div className="profile-board-list clear">
        <BoardList 
          recipes={this.props.recipes} 
          boards={this.props.user.boards}/>
      </div>
    );
  }
}

export default ProfileBoards;