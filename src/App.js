import React, { Component } from 'react';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import RecipeList from './components/RecipeList/RecipeList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <RecipeList />
        
      </div>
    );
  }
}

export default App;
