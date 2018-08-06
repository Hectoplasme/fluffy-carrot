import React, { Component } from 'react';
import './App.css';

import Navbar from './components/Navbar/Navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="heading-1">Ceci est un titre de niveau 1 </h1>
        <h2 className="heading-2">Ceci est un titre de niveau 2 </h2>
        <h3 className="heading-3">Ceci est un titre de niveau 3 </h3>
        <h4 className="heading-4">Ceci est un titre de niveau 4 </h4>
        <h5 className="heading-5">Ceci est un titre de niveau 5 </h5>
        <h6 className="heading-6">Ceci est un titre de niveau 6 </h6>
        <p className="text">Ceci est du texte tout simple</p>
        <p className="text">Ceci est du texte tout simple dans un paragraphe, juste pour voir un peu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat vestibulum sem. Etiam id dapibus arcu, non malesuada leo. Phasellus auctor arcu eu turpis pharetra molestie. Nam libero nibh, ornare ut velit at, aliquam ultrices augue. Quisque rhoncus lacus feugiat consectetur luctus. Curabitur rhoncus scelerisque nulla non pretium. Ut in odio non tellus euismod dapibus in vel risus. Nullam fringilla augue ornare tortor cursus, sed consectetur mi tincidunt. Sed in risus eget purus condimentum rutrum.</p>
        <a href="#" className="link">Ceci est un lien </a>
        <a href="#" className="link"><i className="icon fas fa-user-circle"></i>Ceci est un lien avec un icone</a>
        <a href="#" className="link is-active">Ceci est un lien actif</a>
        <button className="link">Pouet</button>
        <p className="text"><button className="btn btn-floating"><i className="icon fas fa-plus"></i></button><button className="btn btn-floating"><i className="icon fas fa-plus-circle icon-accent icon-large"></i></button></p>
        <div className="input-field input-field--search">
          <i className="icon fas fa-search"></i>
          <input autoComplete="off" placeholder="Rechercher" className="input" />
        </div>
        <Navbar />
      </div>
    );
  }
}

export default App;
