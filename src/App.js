import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

//Data
import data from './data';

//CSS
import './App.css';

//Components
import Navbar from './components/Navbar/Navbar';

//Pages
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Navbar />

          <Route exact path="/"  render={ (props) => (
            <Home data={data} />
          )}/>
          <Route path="/:id" render={(props) => (
            <Profile data={data} {...props} />
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
