import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";

//CSS
import './SubNav.css'

class SubNav extends Component {
  render() {
    return (
      <div className="subnav container--thin">
        <NavLink 
          exact={true} 
          to={`/${this.props.id}`} 
          className="link subnav-item" 
          activeClassName="is-active">Aperçu</NavLink>
        <NavLink 
          exact={true} 
          to={`/${this.props.id}/boards`} 
          className="link subnav-item" 
          activeClassName="is-active">Tableaux</NavLink>
        <NavLink 
          exact={true} 
          to={`/${this.props.id}/recipes`} 
          className="link subnav-item" 
          activeClassName="is-active">Recettes</NavLink>
        <NavLink 
          exact={true} 
          to={`/${this.props.id}/subscribers`} 
          className="link subnav-item" 
          activeClassName="is-active">Abonnements</NavLink>
        <NavLink 
          exact={true} 
          to={`/${this.props.id}/subscriptions`} 
          className="link subnav-item" 
          activeClassName="is-active">subscriptions</NavLink>

      </div>
    );
  }
}

export default SubNav;