import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";

//Components
import Recipes from "../recipes/Recipes";
import Page404 from "../pages/404";

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      recipesLoaded: false,
      boardExists: true,
      board: {},
      user: {}
    };
  }

  componentDidMount() {
    const { firestore } = this.props;
    const { boardExists, board } = this.state;

    //check if the board exists
    if (!board && boardExists) {
      firestore
        .get({ collection: "boards", doc: this.props.match.params.boardId })
        .then(res => {
          this.updateBoard(res);
        });
    }

    firestore.setListener(
      { collection: "boards", doc: this.props.match.params.boardId },
      res => this.updateBoard(res)
    );
  }

  componentWillUnmount() {
    const { firestore } = this.props;
    firestore.unsetListener(
      { collection: "boards", doc: this.props.match.params.boardId },
      res => this.updateBoard(res)
    );
  }

  fetchRecipes(boardId) {
    // const { recipesLoaded } = this.state;
    const { firestore } = this.props;
    firestore
      .get({ collection: "recipes", where: [["board", "==", boardId]] })
      .then(res => {
        const recipes = [];
        if (res.docs) {
          res.docs.forEach(doc => {
            if (doc.data()) {
              recipes.push({ id: doc.id, ...doc.data() });
            }
          });
        }

        this.setState({ recipes: recipes, recipesLoaded: true });
      });
  }

  fetchUser() {
    const { firestore } = this.props;
    firestore
      .get({
        collection: "users",
        where: [["slug", "==", this.props.match.params.slug]]
      })
      .then(res => {
        if (res.docs && res.docs[0].data()) {
          this.setState({
            user: { id: res.docs[0].id, ...res.docs[0].data() }
          });
        }
      });
  }

  updateBoard(res) {
    console.log(res);
    if (res.exists) {
      this.fetchUser();
      this.fetchRecipes(res.id);
      this.setState({ board: { id: res.id, ...res.data() } });
    } else {
      this.setState({ boardExists: false });
    }
  }

  render() {
    const { recipes, recipesLoaded, board, boardExists, user } = this.state;
    const { profile } = this.props;
    if (board && board.id && user.id) {
      return (
        <div>
          <div className="max-w-lg p-8 mx-auto mb-4">
            <div className="mb-4">
              {profile &&
                profile.slug === board.author && (
                  <Link
                    to={`/board/edit/${board.id}`}
                    className="btn-floating h-12 w-12 text-2xl mr-2 no-underline"
                  >
                    <i className="fas fa-pen icon" />
                  </Link>
                )}
            </div>
            <div className="flex items-center justify-between">
              <div className="w-4/5 pr-4">
                <h1 className="text-5xl mb-2">{board.title}</h1>
                {recipesLoaded && (
                  <p className="text-grey-darker">
                    {recipes.length} recette
                    {recipes.length > 1 ? "s" : ""}
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
          <Recipes
            add={profile && profile.slug === board.author}
            recipes={recipes}
          />
        </div>
      );
    } else if (!boardExists) {
      return <Page404 />;
    } else {
      // @placeholder single board
      return (
        <div>
          <div className="max-w-lg p-8 mx-auto mb-4">
            <div className="mb-4">
              <button className="btn-floating h-12 w-12 text-2xl mr-2 bg-grey-light" />
              <button className="btn-floating h-12 w-12 text-2xl bg-grey-light" />
            </div>
            <div className="flex items-center justify-between">
              <div className="w-4/5 pr-4">
                <div className="mb-2 w-full bg-grey-light h-12" />
                <div className="mb-2 max-w-100 w-64 bg-grey-light h-12" />
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
  profile: PropTypes.object
};

export default compose(
  firestoreConnect(),
  firebaseConnect(),
  connect(({ firestore: { ordered }, firebase }) => ({
    profile: firebase.profile
  }))
)(Board);
