import React, { Component } from 'react';

//CSS
import "./Profile.css";

//Components
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import SubNav from '../../components/SubNav/SubNav';

//Template parts
import ProfileOverview from './ProfileOverview/ProfileOverview';

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
        <SubNav />
        <div className="container--thin">
          <ProfileOverview 
            recipes={this.props.data.recipes}
            user={this.state.user} />
        </div>
      </div>
    );
  }
}

export default Profile;