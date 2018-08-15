import React, { Component } from 'react';

//CSS
import './Tile.css'

class Tile extends Component {
  render() {
    return (
      <div className="tile" style={{
        background: this.props.img ? `#efefef url(${this.props.img})` : "#efefef",
        backgroundSize: "cover"
      }}>
      </div>
    );
  }
}

export default Tile;