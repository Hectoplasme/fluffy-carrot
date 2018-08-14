import React, { Component } from 'react';

//CSS
import './TiledRecipesContainer.css'

//Components
import Tile from './Tile/Tile';

class TiledRecipesContainer extends Component {
  render() {
    return (
      <div className="tiled-header">
        <div class="tile-wrapper">
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
        </div>
      </div>
    );
  }
}

export default TiledRecipesContainer;