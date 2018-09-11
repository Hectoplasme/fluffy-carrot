import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./helpers/auth";

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
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                exact
                path="/recipe/add/"
                component={UserIsAuthenticated(AddRecipe)}
              />
              <Route exact path="/recipe/:recipe" component={Recipe} />
              <Route
                exact
                path="/board/add/"
                component={UserIsAuthenticated(AddBoard)}
              />
              <Route exact path="/share/:id" component={Share} />
              <Route
                exact
                path="/delete/recipe/:recipe"
                component={UserIsAuthenticated(DeleteRecipe)}
              />
              <Route
                exact
                path="/edit/recipe/:recipe"
                component={UserIsAuthenticated(EditRecipe)}
              />
              <Route
                exact
                path="/edit/board/:board"
                component={UserIsAuthenticated(EditBoard)}
              />
              <Route
                exact
                path="/delete/board/:board"
                component={UserIsAuthenticated(DeleteBoard)}
              />

              <Route
                exact
                path="/login"
                component={UserIsNotAuthenticated(Login)}
              />
              <Route
                exact
                path="/register"
                component={UserIsNotAuthenticated(Register)}
              />

              <Route exact path="/:id/board/:board" component={Board} />
              <Route path="/:id" render={props => <Profile {...props} />} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
