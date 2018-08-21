import React from 'react';
import { Route } from "react-router-dom";

//Components
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import ProfileBoards from './pages/Profile/ProfileBoards/ProfileBoards';
import ProfileRecipes from './pages/Profile/ProfileRecipes/ProfileRecipes';
import ProfileSubscribers from './pages/Profile/ProfileSubscribers/ProfileSubscribers';
import ProfileSubscriptions from './pages/Profile/ProfileSubscriptions/ProfileSubscriptions';

//Data
const routesWithSub = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/:id",
    component: Profile,
    routes: [
      {
        path: "/:id/boards",
        component: ProfileBoards
      },
      {
        path: "/:id/recipes",
        component: ProfileRecipes
      },
      {
        path: "/:id/subscribers",
        component: ProfileSubscribers
      },
      {
        path: "/:id/subscriptions",
        component: ProfileSubscriptions
      }
    ]
  }
];

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
);

export const routes = routesWithSub;
export const RouteWithSub = RouteWithSubRoutes;