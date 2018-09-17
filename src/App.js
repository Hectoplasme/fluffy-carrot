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
import Search from "./components/pages/Search";
import About from "./components/pages/About";

//Modals
import AddRecipe from "./components/recipes/AddRecipe";
import DeleteRecipe from "./components/recipes/DeleteRecipe";
import EditRecipe from "./components/recipes/EditRecipe";
import PinRecipe from "./components/recipes/PinRecipe";
import AddBoard from "./components/boards/AddBoard";
import DeleteBoard from "./components/boards/DeleteBoard";
import EditBoard from "./components/boards/EditBoard";
import Login from "./components/auth/Login";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route component={Navbar} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/search/:keyword" component={Search} />

              {/* Recipes routes */}
              <Route
                exact
                path="/recipe/add"
                component={UserIsAuthenticated(AddRecipe)}
              />
              <Route
                exact
                path="/recipe/delete/:recipeId"
                component={UserIsAuthenticated(DeleteRecipe)}
              />
              <Route
                exact
                path="/recipe/edit/:recipeId"
                component={UserIsAuthenticated(EditRecipe)}
              />
              <Route
                exact
                path="/pin/:recipeId"
                component={UserIsAuthenticated(PinRecipe)}
              />
              <Route exact path="/recipe/:recipeId" component={Recipe} />

              {/* Boards routes */}
              <Route
                exact
                path="/board/add/"
                component={UserIsAuthenticated(AddBoard)}
              />
              <Route
                exact
                path="/board/delete/:boardId"
                component={UserIsAuthenticated(DeleteBoard)}
              />
              <Route
                exact
                path="/board/edit/:boardId"
                component={UserIsAuthenticated(EditBoard)}
              />
              <Route exact path="/:slug/board/:boardId" component={Board} />

              {/* Login route */}
              <Route
                exact
                path="/login"
                component={UserIsNotAuthenticated(Login)}
              />

              {/* Profile route */}
              <Route exact path="/:slug" component={Profile} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
