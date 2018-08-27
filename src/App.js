import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Data
import data from './data';

//CSS
import './App.css';

//Components
import Navbar from './components/Navbar/Navbar';

//Pages
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Recipe from './pages/Recipe/Recipe';
import Board from './pages/Board/Board';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Navbar />
          <Switch>
            <Route exact path="/"  render={ (props) => (
              <Home data={data} />
            )}/>
            <Route exact path="/recipe/:recipeId" render={(props) => (
              <Recipe data={data} {...props} />
            )} />
            <Route exact path="/board/:boardId" render={(props) => (
              <Board data={data} {...props} />
            )} />
            <Route path="/:id" render={(props) => (
              <Profile data={data} {...props} />
            )} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
