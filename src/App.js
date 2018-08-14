import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

//CSS
import './App.css';

//Components
import Navbar from './components/Navbar/Navbar';

//Pages
import Home from './pages/Home/Home';
import Profil from './pages/Profile/Profile';



class App extends Component {
  render() {
    return (
      <Router>
        <div class="app">
          <Navbar />

          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profil} />
        </div>
      </Router>
    );
  }
}

export default App;
