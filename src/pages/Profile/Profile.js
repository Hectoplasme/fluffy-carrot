import React, { Component } from 'react';

//Components
import TiledRecipesContainer from '../../components/TiledRecipesContainer/TilesRecipesContainer';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user : this.getProfileUser(this.props.match.params.id)
    }

    this.getProfileUser = this.getProfileUser.bind(this);
  }

  getProfileUser(id) {
    return this.props.data.users.find(user => user.id === id);
  }

  render() {
    return (
      <div className="main main-profile">
        <TiledRecipesContainer 
          data={this.props.data.recipes} 
          recipes={this.state.user.recipes}/>
        <h1 className="heading-1">{this.state.user.username}</h1>
      </div>
    );
  }
}

export default Profile;