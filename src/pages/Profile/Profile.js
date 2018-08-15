import React, { Component } from 'react';

//Components
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';

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
        <ProfileHeader 
          data={this.props.data.recipes} 
          user={this.state.user} />
      </div>
    );
  }
}

export default Profile;