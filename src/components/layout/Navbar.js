import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

//Components
import Dropdown from "../layout/Dropdown";

class Navbar extends Component {
  state = {
    showDropdown: false
  };
  toggleDropdown = e => {
    this.dropdownHandler.blur();

    this.setState({
      showDropdown: !this.state.showDropdown
    });
  };
  render() {
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
            to="/user"
            className="link link--icon"
            activeClassName="active"
          >
            <i className="fas fa-user-circle icon" />
            <span>Mes recettes</span>
          </NavLink>
          <NavLink
            to="/add"
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
                <Link
                  to="/login"
                  className="hover:bg-grey-lightest no-underline text-xl font-bold text-black block py-6  border-b border-grey-lighter outline-none"
                >
                  Se connecter
                </Link>
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

export default Navbar;
