import React, { Component } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import './Navbar.css';


class Navbar extends Component {
  render() {
    return (
      <div className="navbar border-bottom">
        <a href="#" className="navbar-item navbar-brand btn btn-floating">
          <i className="icon fas fa-cookie-bite"></i>
        </a>
        <SearchBox className="navbar-item navbar-expand"/>
        <a href="#" className="link hidden-on-mobile">Accueil</a>
        <a href="#" className="link link--icon">
          <i className="icon icon-large fas fa-user-circle"></i><span className="hidden-on-mobile">Mes recettes</span>
        </a>
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
