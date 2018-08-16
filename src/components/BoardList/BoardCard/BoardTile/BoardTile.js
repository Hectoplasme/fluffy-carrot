import React, { Component } from 'react';

//CSS
import './BoardTile.css'

class BoardTile extends Component {
  render() {
    return (
      <div className={`${this.props.className || ""} board-tile`} style={{
        background: this.props.imgUrl ? `#efefef url(${this.props.imgUrl})` : `#efefef`,
        backgroundSize: `cover`
      }}>
        
      </div>
    );
  }
}

export default BoardTile;