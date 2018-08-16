import React, { Component } from 'react';

//CSS
import './BoardList.css'

//Components
import BoardCard from './BoardCard/BoardCard';

class BoardList extends Component {
  render() {
    return (
      <div className="board-list clear">
        <BoardCard />
        <BoardCard />
        <BoardCard />
      </div>
    );
  }
}

export default BoardList;