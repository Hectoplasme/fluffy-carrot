import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Components
import Navbar from "./components/layout/Navbar";
//Pages
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Board from "./components/pages/Board";
import Recipe from "./components/pages/Recipe";

//Modals
import AddRecipe from "./components/recipes/AddRecipe";
import DeleteRecipe from "./components/recipes/DeleteRecipe";
import EditRecipe from "./components/recipes/EditRecipe";
import AddBoard from "./components/boards/AddBoard";
import DeleteBoard from "./components/boards/DeleteBoard";
import EditBoard from "./components/boards/EditBoard";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import Share from "./components/users/Share";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="overflow-hidden">
            <Navbar />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/recipe/:recipe" component={Recipe} />
              <Route exact path="/add/" component={AddRecipe} />
              <Route exact path="/create" component={AddBoard} />
              <Route exact path="/share/:id" component={Share} />
              <Route
                exact
                path="/delete/recipe/:recipe"
                component={DeleteRecipe}
              />
              <Route exact path="/edit/recipe/:recipe" component={EditRecipe} />
              <Route exact path="/edit/board/:board" component={EditBoard} />
              <Route
                exact
                path="/delete/board/:board"
                component={DeleteBoard}
              />

              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />

              <Route exact path="/:id/board/:board" component={Board} />
              <Route path="/:id" render={props => <Profile {...props} />} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
