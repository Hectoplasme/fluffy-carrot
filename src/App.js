import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Data
import data from "./data";

//CSS
import "./App.css";

//Components
import Navbar from "./components/Navbar/Navbar";
import AddModal from "./components/Modals/AddModal/AddModal";

//Pages
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Recipe from "./pages/Recipe/Recipe";
import Board from "./pages/Board/Board";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <div className="overflow-hidden">
            <Navbar />
            <Switch>
              <Route exact path="/" render={props => <Home data={data} />} />
              <Route
                exact
                path="/recipe/:recipeId"
                render={props => <Recipe data={data} {...props} />}
              />
              <Route
                exact
                path="/board/:boardId"
                render={props => <Board data={data} {...props} />}
              />
              <Route
                path="/:id"
                render={props => <Profile data={data} {...props} />}
              />
            </Switch>
          </div>

          {/* Modals */}
          {/* <div className="modal-container">
            <AddModal />
          </div> */}
        </div>
      </Router>
    );
  }
}

export default App;
