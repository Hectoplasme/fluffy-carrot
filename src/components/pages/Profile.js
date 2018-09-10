import React, { Component } from "react";
import { Route } from "react-router-dom";

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
    return (
      <div className="relative">
        <button className="btn btn--accent shadow absolute z-10 pin-t pin-r mt-8 mr-8 p-3">
          S'abonner
        </button>
        <TiledRecipes user="user" />
        <UserHeader
          id="pouet"
          avatar="https://picsum.photos/400/400/?random"
          username="Studio Pouet"
          recipes={["recipe-1", "recipe-2", "recipe-4"]}
          boards={[1, 2, 3, 4]}
          subscriptions={["user-1"]}
          subscribers={["user-1"]}
        />
        <SubNavbar id="user" />

        <Route
          exact
          path="/:id"
          render={props => <ProfileOverview {...props} />}
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

export default Profile;
