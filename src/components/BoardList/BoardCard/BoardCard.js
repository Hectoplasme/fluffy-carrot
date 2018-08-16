import React, { Component } from 'react';

//CSS
import './BoardCard.css'

//Components
import BoardTile from './BoardTile/BoardTile';

class BoardCard extends Component {
  render() {
    return (
      <a href="#" className="board-card">
        <div className="board-preview">
          <BoardTile className="board" imgUrl="https://picsum.photos/200/400/?random" />
          <BoardTile />
          <BoardTile />
        </div>
        <p class="heading-6 board-title">Nom du tableau</p>
        <p class="text">3 recettes</p>
      </a>
    );
  }
}

export default BoardCard;