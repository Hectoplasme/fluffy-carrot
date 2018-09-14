import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";

//Components
import Recipes from "../recipes/Recipes";

class Board extends Component {
  render() {
    const { auth, user, recipes, board } = this.props;
    if (recipes && user && board) {
      return (
        <div>
          <div className="max-w-lg p-8 mx-auto mb-4">
            <div className="mb-4">
              {auth.uid &&
                auth.uid === user.id && (
                  <Link
                    to={`/board/edit/${board.id}`}
                    className="btn-floating h-12 w-12 text-2xl mr-2 no-underline"
                  >
                    <i className="fas fa-pen icon" />
                  </Link>
                )}
              <button className="btn-floating h-12 w-12 text-2xl ">
                <i className="fas fa-share-alt icon" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="w-4/5 pr-4">
                <h1 className="text-5xl mb-2">{board.title}</h1>
                {board.recipes && (
                  <p className="text-grey-darker">
                    {board.recipes.length} recette
                    {board.recipes.length > 1 ? "s" : ""}
                  </p>
                )}
              </div>
              <Link
                to={`/${user.slug}`}
                className="hidden sm:block h-16 w-16 rounded-full"
                style={{
                  background: `#dae1e7 url(${user.avatar})`,
                  backgroundSize: "cover"
                }}
              />
            </div>
          </div>
          <Recipes recipes={recipes} />
        </div>
      );
    } else {
      //@placeholder
      return (
        <div>
          <div className="max-w-lg p-8 mx-auto mb-4">
            <div className="mb-4">
              <button className="btn-floating h-12 w-12 text-2xl mr-2 bg-grey-light" />
              <button className="btn-floating h-12 w-12 text-2xl bg-grey-light" />
            </div>
            <div className="flex items-center justify-between">
              <div className="w-4/5 pr-4">
                <h1 className="mb-2 w-full bg-grey-light h-12" />
                <h1 className="mb-2 max-w-100 w-64 bg-grey-light h-12" />
                <p className="h-4 bg-grey w-32" />
              </div>
              <div
                className="hidden sm:block h-16 w-16 rounded-full"
                style={{
                  background: `#dae1e7`,
                  backgroundSize: "cover"
                }}
              />
            </div>
          </div>
          <Recipes />
        </div>
      );
    }
  }
}

Board.propTypes = {
  firestore: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  recipes: PropTypes.array,
  auth: PropTypes.object,
  user: PropTypes.object,
  board: PropTypes.object
};

export default compose(
  firebaseConnect(),
  firestoreConnect(props => [
    {
      collection: "recipes",
      where: [["board", "==", props.match.params.board]]
    },
    {
      collection: "users",
      where: [["slug", "==", props.match.params.id]],
      storeAs: "user"
    },
    { collection: "boards", doc: props.match.params.board, storeAs: "board" }
  ]),
  connect(({ firestore: { ordered }, firebase }, props) => ({
    recipes: ordered.recipes,
    user: ordered.user && ordered.user[0],
    board: ordered.board && ordered.board[0],
    auth: firebase.auth
  }))
)(Board);
