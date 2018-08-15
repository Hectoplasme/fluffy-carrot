import React, { Component } from 'react';

//CSS
import './ProfileHeader.css'

//Components
import TiledRecipesContainer from './TiledRecipesContainer/TilesRecipesContainer';
import InfosUserHeader from './InfosUserHeader/InfosUserHeader';

class ProfileHeader extends Component {
  render() {
    return (
      <div className="profile-header">
        <TiledRecipesContainer 
          data={this.props.data} 
          recipes={this.props.user.recipes}/>
        <InfosUserHeader 
          {...this.props.user} />
      </div>
    );
  }
}

export default ProfileHeader;