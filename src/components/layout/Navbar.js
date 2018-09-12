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
  state = {
    showDropdown: false,
    isAuthenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
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
    const { isAuthenticated } = this.state;
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
            to={isAuthenticated ? "/user" : "/login"}
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
                {!isAuthenticated && (
                  <Link
                    to="/login"
                    className="hover:bg-grey-lightest no-underline text-xl font-bold text-black block py-6  border-b border-grey-lighter outline-none"
                  >
                    Se connecter
                  </Link>
                )}
                {isAuthenticated && (
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
  }
}

Navbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(Navbar);
