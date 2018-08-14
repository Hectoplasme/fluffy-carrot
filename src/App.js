import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

//CSS
import './App.css';

//Components
import Navbar from './components/Navbar/Navbar';

//Pages
import Home from './pages/Home/Home';
import Profil from './pages/Profile/Profile';


//Data
const data = {
  recipes : [
    {
      id: "recipe-1",
      title : "Pâtes à la carbonara",
      imgUrl : "https://picsum.photos/200/300/?random",
      height: 300,
      width: 200
    },
    {
      id: "recipe-2",
      title : "Pâtes bolognaise",
      imgUrl : "https://picsum.photos/500/500/?random",
      height: 500,
      width: 500
    },
    {
      id: "recipe-3",
      title : "Risotto au poulet",
      imgUrl : "https://picsum.photos/300/400/?random",
      height: 400,
      width: 300
    },
    {
      id: "recipe-4",
      title : "Risotto aux champignons",
      imgUrl : "https://picsum.photos/200/400/?random",
      height: 400,
      width: 200
    },
    {
      id: "recipe-5",
      title : "Pâtes à la carbonara",
      imgUrl : "https://picsum.photos/200/300/?random",
      height: 300,
      width: 200
    },
    {
      id: "recipe-6",
      title : "Pâtes bolognaise",
      imgUrl : "https://picsum.photos/500/500/?random",
      height: 500,
      width: 500
    },
    {
      id: "recipe-7",
      title : "Risotto au poulet",
      imgUrl : "https://picsum.photos/300/400/?random",
      height: 400,
      width: 300
    },
    {
      id: "recipe-8",
      title : "Risotto aux champignons",
      imgUrl : "https://picsum.photos/200/400/?random",
      height: 400,
      width: 200
    },
]
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Navbar />

          <Route exact path="/"  render={ (props) => (
            <Home data={data} />
          )}/>
          <Route path="/profile" component={Profil} />
        </div>
      </Router>
    );
  }
}

export default App;
