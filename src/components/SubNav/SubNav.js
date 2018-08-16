import React, { Component } from 'react';

//CSS
import './SubNav.css'

class SubNav extends Component {
  render() {
    return (
      <div className="subnav container--thin">
        <a href="#" className="link subnav-item">Aperçu</a>
        <a href="#" className="link subnav-item">Tableaux</a>
        <a href="#" className="link subnav-item">Recettes</a>
        <a href="#" className="link subnav-item">Abonnements</a>
        <a href="#" className="link subnav-item">Abonnés</a>
      </div>
    );
  }
}

export default SubNav;