import React, { Component } from 'react';

//CSS
import './InfosUserHeader.css'

class InfosUserHeader extends Component {
  render() {
    return (
      <div className="profile-infos">
        <div className="avatar--big" style={{
          background: `#efefef url(${this.props.avatar})`,
          backgroundSize: "cover"
        }}></div>
        <div className="infos-content">
          <h1 className="heading-4 infos-username">{this.props.username}</h1>
          <ul className="infos-list">
            <li className="infos-list-item">
              {`${this.props.recipes.length} recette${this.props.recipes.length > 1 ? "s": ""}`} 
            </li>
            <li className="infos-list-item">
              {`${this.props.boards.length} tableau${this.props.boards.length > 1 ? "x": ""}`} 
            </li>
            <li className="infos-list-item">
              {`${this.props.subscriptions.length} abonnement${this.props.subscriptions.length > 1 ? "s": ""}`} 
            </li>
            <li className="infos-list-item">
              {`${this.props.subscribers.length} abonné${this.props.subscribers.length > 1 ? "s": ""}`}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default InfosUserHeader;