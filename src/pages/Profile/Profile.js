import React, { Component } from 'react';

//Components
import TiledRecipesContainer from '../../components/TiledRecipesContainer/TilesRecipesContainer';

class Profile extends Component {
  render() {
    return (
      <div className="main main-profile">
        <TiledRecipesContainer />
      </div>
    );
  }
}

export default Profile;