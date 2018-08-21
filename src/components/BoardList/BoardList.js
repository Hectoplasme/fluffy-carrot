import React, { Component } from 'react';

//CSS
import './BoardList.css'

//Components
import BoardCard from './BoardCard/BoardCard';
import AddButton from '../AddButton/AddButton';

class BoardList extends Component {
  render() {
    return (
      <div className="board-list clear">
        {this.props.addEnable ? <AddButton board/> : "" }

        {this.props.boards.map(board => {
          return <BoardCard 
                    key={board.id} 
                    board={board}
                    recipes={this.props.recipes}/>
        })}
      </div>
    );
  }
}

export default BoardList;