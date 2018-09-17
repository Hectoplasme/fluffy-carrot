import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

//Components
import Dropdown from "../layout/Dropdown";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
      isAuthenticated: false
    };
  }
  onLogOutClick = e => {
    e.preventDefault();

    const { firebase } = this.props;
    firebase.logout();
  };

  toggleDropdown = e => {
    this.dropdownHandler.blur();

    this.setState({
      showDropdown: !this.state.showDropdown
    });
  };
  render() {
    const { profile } = this.props;

    if (profile) {
      return (
        <div className="flex items-center px-4 py-3 border-b border-grey-lighter">
          <NavLink
            exact
            className="btn-floating btn-floating--accent"
            activeClassName="active"
            to="/"
          >
            <i className="fas fa-cookie-bite icon" />
          </NavLink>
          <div className="flex items-center ml-auto">
            <NavLink
              exact
              to="/"
              className="link hidden sm:inline"
              activeClassName="active"
            >
              Accueil
            </NavLink>
            <NavLink
              exact
              to={!profile.isEmpty ? `/${profile.slug}` : "/login"}
              className="link link--icon"
              activeClassName="active"
            >
              <i className="fas fa-user-circle icon" />
              <span>Mes recettes</span>
            </NavLink>
            <NavLink
              to="/recipe/add"
              className="btn-floating btn-floating--accent"
              activeClassName="active"
            >
              <i className="fas fa-plus-circle icon text-4xl" />
            </NavLink>
            <button
              className="relative btn-floating outline-none"
              onClick={this.toggleDropdown}
              ref={ref => (this.dropdownHandler = ref)}
            >
              <i className="fas fa-ellipsis-h icon" />
              <div>
                <Dropdown
                  show={this.state.showDropdown}
                  toggle={this.toggleDropdown}
                >
                  {profile.isEmpty && (
                    <Link
                      to="/login"
                      className="hover:bg-grey-lightest no-underline text-xl font-bold text-black block py-6  border-b border-grey-lighter outline-none"
                    >
                      Se connecter
                    </Link>
                  )}
                  {!profile.isEmpty && (
                    <a
                      href="#!"
                      className="hover:bg-grey-lightest no-underline text-xl font-bold text-black block py-6  border-b border-grey-lighter outline-none"
                      onClick={this.onLogOutClick}
                    >
                      Se déconnecter
                    </a>
                  )}
                  <Link
                    to="/about"
                    className="hover:bg-grey-lightest no-underline text-xl font-bold text-black block py-6 focus"
                  >
                    A propos
                  </Link>
                </Dropdown>
              </div>
            </button>
          </div>
        </div>
      );
    } else {
      // @Placeholder navbar
      return (
        <div className="flex items-center px-4 py-3 border-b border-grey-lighter">
          <NavLink
            exact
            className="btn-floating btn-floating--accent"
            activeClassName="active"
            to="/"
          >
            <i className="fas fa-cookie-bite icon" />
          </NavLink>
          <div className="flex items-center ml-auto">
            <div className="link hidden sm:inline bg-grey-lighter text-grey-lighter mr-2">
              Accueil
            </div>
            <div className="link link--icon bg-grey-lighter text-grey-lighter mr-2">
              <i className="fas fa-user-circle icon" />
              <span>Mes recettes</span>
            </div>
            <div className="btn-floating btn-floating--accent bg-grey-lighter mr-2" />
            <div className="relative btn-floating outline-none bg-grey-lighter" />
          </div>
        </div>
      );
    }
  }
}

Navbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  profile: PropTypes.object
};

export default compose(
  firebaseConnect(),
  connect(state => ({
    profile: state.firebase.profile
  }))
)(Navbar);
