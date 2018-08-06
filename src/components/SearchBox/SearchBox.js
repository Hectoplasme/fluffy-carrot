import React, { Component } from 'react';
import './SearchBox.css';


class SearchBox extends Component {
  render() {
    return (
      <div className={`${this.props.className} search-box`}>
        <div className="input-field input-field--search">
            <i className="icon fas fa-search"></i>
            <input autoComplete="off" placeholder="Rechercher" className="input" />
        </div>
      </div>
    );
  }
}

export default SearchBox;
