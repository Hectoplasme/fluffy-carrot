import React, { Component } from "react";
import PropTypes from "prop-types";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";

//Components
import TiledRecipes from "../recipes/TiledRecipes";
import UserHeader from "../users/UserHeader";
import Recipes from "../recipes/Recipes";
import Boards from "../boards/Boards";
import Page404 from "../pages/404";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userExists: true
    };
  }
  componentDidMount() {
    const { userExists } = this.state;
    const { firestore, profileUser } = this.props;

    //Check if the user exist
    if (!profileUser && userExists) {
      firestore
        .get({
          collection: "users",
          where: [["slug", "==", this.props.match.params.slug]]
        })
        .then(res => {
          this.setState({ userExists: false });
        });
    }
  }
  render() {
    const { userExists } = this.state;
    const { profile, profileUser, profileBoards, profileRecipes } = this.props;
    if (profileUser && profileBoards && profileRecipes) {
      return (
        <div className="relative">
          <TiledRecipes recipes={profileRecipes} />
          <UserHeader
            {...profileUser}
            recipes={profileRecipes}
            boards={profileBoards}
          />
          <div>
            <div className="flex items-center justify-between max-w-2xl mx-auto px-8 md:px-24">
              <h2 className="text-2xl w-4/5">Recettes les plus récentes</h2>
            </div>
            <Recipes
              thin
              recipes={profileRecipes.slice(0, 16)}
              add={profileUser.slug === profile.slug}
            />

            <div className="flex items-center justify-between max-w-2xl mx-auto px-8 md:px-24">
              <h2 className="text-2xl w-4/5">
                Tableaux de {profileUser.username}
              </h2>
            </div>
            <Boards
              thin
              boards={profileBoards}
              add={profileUser.slug === profile.slug}
            />
          </div>
        </div>
      );
    } else if (!userExists) {
      return <Page404 />;
    } else {
      return (
        <div className="relative">
          <TiledRecipes />
          <UserHeader />
          <div>
            <div className="flex items-center justify-between max-w-2xl mx-auto px-8 md:px-24">
              <h2 className="text-2xl w-4/5">Recettes les plus récentes</h2>
            </div>
            <Recipes thin />

            <div className="flex items-center justify-between max-w-2xl mx-auto px-8 md:px-24">
              <h2 className="text-2xl w-4/5">Tableaux</h2>
            </div>
            <Boards thin />
          </div>
        </div>
      );
    }
  }
}

Profile.propTypes = {
  firestore: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  profile: PropTypes.object,
  profileUser: PropTypes.object,
  profileRecipes: PropTypes.array,
  profileBoards: PropTypes.array
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "users",
      where: [["slug", "==", props.match.params.slug]],
      storeAs: "profileUser"
    },
    {
      collection: "recipes",
      where: [["user", "==", props.match.params.slug]],
      storeAs: "profileRecipes"
    },
    {
      collection: "boards",
      where: [["author", "==", props.match.params.slug]],
      storeAs: "profileBoards"
    }
  ]),
  firebaseConnect(),
  connect(({ firestore: { ordered }, firebase }) => ({
    profileUser: ordered.profileUser && ordered.profileUser[0],
    profileRecipes: ordered.profileRecipes,
    profileBoards: ordered.profileBoards,
    profile: firebase.profile
  }))
)(Profile);
