import React, { Component } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";

//Components
import TiledRecipes from "../recipes/TiledRecipes";
import UserHeader from "../users/UserHeader";
import SubNavbar from "../layout/SubNavbar";

//Profile parts
import ProfileOverview from "./profile-parts/ProfileOverview";
import ProfileRecipes from "./profile-parts/ProfileRecipes";
import ProfileBoards from "./profile-parts/ProfileBoards";
import ProfileSubscribers from "./profile-parts/ProfileSubscribers";
import ProfileSubscriptions from "./profile-parts/ProfileSubscriptions";

class Profile extends Component {
  render() {
    const { user, auth } = this.props;
    return (
      <div className="relative">
        {user && (
          <div>
            <button className="btn btn--accent shadow absolute z-10 pin-t pin-r mt-8 mr-8 p-3">
              S'abonner
            </button>
            <TiledRecipes userId={user.id} />
            <UserHeader
              id="pouet"
              avatar={user.avatar}
              username="Studio Pouet"
              recipes={user.recipes}
              boards={user.boards}
              subscriptions={user.subscriptions}
              subscribers={user.subscribers}
            />
            <SubNavbar slug={user.slug} />
          </div>
        )}
        {!user && (
          <div>
            <TiledRecipes />
            <UserHeader />
            <SubNavbar />
          </div>
        )}

        <Route
          exact
          path="/:id"
          render={props => <ProfileOverview id={user && user.id} {...props} />}
        />
        <Route
          path="/:id/boards"
          render={props => <ProfileBoards {...props} />}
        />
        <Route
          path="/:id/recipes"
          render={props => <ProfileRecipes {...props} />}
        />
        <Route
          path="/:id/subscribers"
          render={props => <ProfileSubscribers {...props} />}
        />
        <Route
          path="/:id/subscriptions"
          render={props => <ProfileSubscriptions {...props} />}
        />
      </div>
    );
  }
}

Profile.propTypes = {
  firestore: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  recipes: PropTypes.array,
  auth: PropTypes.object,
  user: PropTypes.object
};

export default compose(
  firebaseConnect(),
  firestoreConnect(props => [
    {
      collection: "users",
      where: [["slug", "==", props.match.params.id]],
      storeAs: "user"
    }
  ]),
  connect(({ firestore: { ordered }, firebase }, props) => ({
    user: ordered.user && ordered.user[0],

    auth: firebase.auth
  }))
)(Profile);
