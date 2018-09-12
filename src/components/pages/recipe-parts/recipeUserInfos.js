import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";

const RecipeUserInfos = props => {
  const { user, board, auth } = props;
  if (user && board) {
    return (
      <div className="flex items-center mb-4">
        <Link
          to="/"
          className="flex-no-shrink h-12 w-12 sm:h-16 sm:w-16 mr-2 md:mr-4 rounded-full bg-grey-light"
          style={{
            background: `#dae1e7 url(${user.avatar})`,
            backgroundSize: "cover"
          }}
        />
        <p>
          <Link to="/" className="font-bold no-underline text-black">
            {user.id === auth.uid ? "Vous" : user.username}
          </Link>{" "}
          {user.id === auth.uid ? "avez" : "a"} enregistré cette recette dans{" "}
          <Link to="/" className="font-bold no-underline text-black">
            {board.title}
          </Link>
        </p>
      </div>
    );
  } else {
    return (
      <div className="flex items-center mb-4">
        <div className="flex-no-shrink h-12 w-12 sm:h-16 sm:w-16 mr-2 md:mr-4 rounded-full bg-grey-light" />
        <div className="relative flex-grow">
          <div className="w-full h-3 mb-2 bg-grey-light" />
          <div className="w-full h-3 mb-2 bg-grey-light" />
          <div className="w-full h-3  bg-grey-light" />
        </div>
      </div>
    );
  }
};

RecipeUserInfos.propTypes = {
  firebase: PropTypes.object.isRequired,
  firestore: PropTypes.object.isRequired,
  user: PropTypes.object,
  board: PropTypes.object
};

export default compose(
  firebaseConnect(),
  firestoreConnect(props => [
    {
      collection: "users",
      storeAs: "user",
      doc: props.userId
    },
    {
      collection: "boards",
      storeAs: "board",
      doc: props.boardId
    }
  ]),
  connect((state, props) => ({
    user: state.firestore.ordered.user && state.firestore.ordered.user[0],
    board: state.firestore.ordered.board && state.firestore.ordered.board[0],
    auth: state.firebase.auth
  }))
)(RecipeUserInfos);
