import React, { Component } from 'react';

//CSS
import './ProfileHeader.css'

//Components
import TiledRecipesContainer from './TiledRecipesContainer/TilesRecipesContainer';
import InfosUserHeader from './InfosUserHeader/InfosUserHeader';

class ProfileHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes : this.props.recipes
    }
  }
  render() {
    return (
      <div className="profile-header">
        <TiledRecipesContainer 
          recipes={this.state.recipes}/>
        <InfosUserHeader 
          {...this.props.user} />
      </div>
    );
  }
}

export default ProfileHeader;