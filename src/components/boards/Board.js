import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classnames from "classnames";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect, firestoreConnect } from "react-redux-firebase";

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      imagesLoaded: false
    };
  }

  componentDidMount() {
    const { imagesLoaded } = this.state;
    const { firestore, board } = this.props;

    //Get the the images of three recipes for the thumbnail
    if (board && !imagesLoaded) {
      firestore
        .get({
          collection: "recipes",
          where: [["board", "==", board.id]],
          limit: 3
        })
        .then(res => {
          const images = [];
          if (res.docs) {
            res.docs.forEach(doc => {
              if (doc.data()) {
                images.push({ id: doc.id, ...doc.data() });
              }
            });
          }

          this.setState({ images: images, imagesLoaded: true });
        });
    }
  }

  render() {
    const { profile, board } = this.props;
    const { images } = this.state;

    if (board) {
      return (
        <div className="group">
          <Link
            to={`/${board.author}/board/${board.id}`}
            className="block relative w-full p-3 no-underline text-black after:bg-grey-light"
          >
            {images && (
              <div className="flex flex-col flex-wrap justify-between w-full h-64 mb-4">
                {images.map((recipe, i) => (
                  <div
                    key={`thumbnail-${recipe.id}`}
                    className={classnames("flex-grow w-1/3 h-1/3", {
                      "w-2/3 rounded-l-lg border-r-4 border-white ": i === 0,
                      "rounded-tr-lg": i === 1,
                      "border-t-4 border-white rounded-br-lg": i === 2
                    })}
                    style={{
                      backgroundImage: recipe.imgUrl
                        ? `url(${recipe.imgUrl})`
                        : `#f1f5f8`,
                      backgroundColor: "#f1f5f8",
                      backgroundSize: "cover",
                      flex:
                        i === 0 ? "0 1 100%" : i === 2 ? "0 1 60%" : "0 1 39%"
                    }}
                  />
                ))}
                {images.length < 1 && (
                  <div
                    className="flex-grow w-1/3 h-1/3 rounded-tr-lg w-2/3 rounded-l-lg border-r-4 border-white"
                    style={{
                      backgroundColor: "#f1f5f8",
                      backgroundSize: "cover",
                      flex: "0 1 100%"
                    }}
                  />
                )}
                {images.length < 2 && (
                  <div
                    className="flex-grow w-1/3 h-1/3 rounded-tr-lg"
                    style={{
                      backgroundColor: "#f1f5f8",
                      backgroundSize: "cover",
                      flex: "0 1 60%"
                    }}
                  />
                )}
                {images.length < 3 && (
                  <div
                    className="flex-grow w-1/3 h-1/3 border-t-4 border-white rounded-br-lg"
                    style={{
                      backgroundColor: "#f1f5f8",
                      backgroundSize: "cover",
                      flex: "0 1 39%"
                    }}
                  />
                )}
              </div>
            )}

            <div className="mb-1 text-lg font-bold">{board.title}</div>
          </Link>
          {profile &&
            profile.slug === board.author && (
              <Link
                to={`/board/edit/${board.id}`}
                className="btn-floating btn-floating--sm absolute z-10 block pin-r pin-b mr-5 mb-2 hover:bg-grey hover:text-grey-darkest hidden group-hover:block"
              >
                <i className="fas fa-pen icon align-middle pt-2" />
              </Link>
            )}
        </div>
      );
    } else {
      return <div>Pas de tableau...</div>;
    }
  }
}

Board.propTypes = {
  firestore: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  profile: PropTypes.object,
  board: PropTypes.object,
  boardPreview: PropTypes.array
};

export default compose(
  firestoreConnect(),
  firebaseConnect(),
  connect(({ firebase }) => ({
    profile: firebase.profile
  }))
)(Board);
