import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";

//Components
import SearchBox from '../SearchBox/SearchBox';

//CSS
import './Navbar.css';


class Navbar extends Component {
  render() {
    return (
      <div className="navbar border-bottom">
        <Link to="/" className="navbar-item navbar-brand btn btn-floating">
          <i className="icon fas fa-cookie-bite"></i>
        </Link>
        <SearchBox className="navbar-item navbar-expand"/>
        <NavLink exact={true} to="/" className="link hidden-on-mobile" activeClassName="is-active">Accueil</NavLink>
        <NavLink to="/user-1" className="link link--icon" activeClassName="is-active">
          <i className="icon icon-large fas fa-user-circle"></i><span className="hidden-on-mobile">Mes recettes</span>
        </NavLink>
        <a href="#" className="navbar-item btn btn-floating">
          <i className="icon icon-large icon-accent fas fa-plus-circle"></i>
        </a>
        <a href="#" className="navbar-item btn btn-floating">
          <i className="icon icon-large fas fa-bell"></i>
        </a>
        <a href="#" className="navbar-item btn btn-floating">
          <i className="icon icon-large fas fa-ellipsis-h"></i>
        </a>

      </div>
    );
  }
}

export default Navbar;
