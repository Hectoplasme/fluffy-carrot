import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { Link } from "react-router-dom";

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageLoaded: false
    };

    this.image = React.createRef();
  }

  handleImageLoaded = () => {
    this.setState({ imageLoaded: true });
  };

  render() {
    const { id, imgUrl, title } = this.props;
    const { imageLoaded } = this.state;
    if (id) {
      return (
        <div className="group relative block  w-full m-2 ">
          <Link
            to={`/recipe/pin/${id}`}
            className="btn btn--accent absolute z-10 pin-t pin-r mt-8 mr-8 p-3 hidden group-hover:block no-underline"
          >
            <i className="fas fa-thumbtack icon" />
            Enregistrer
          </Link>
          <Link
            to={`/recipe/${id}`}
            className="inline-block w-full p-4 after:bg-grey-light no-underline focus:outline-none"
          >
            {!imageLoaded && (
              <div
                className="block h-auto w-full max-w-full rounded-lg bg-grey-light"
                style={{
                  height: `${Math.random() * 400 + 200}px`
                }}
              />
            )}
            <img
              className={classnames(
                "block h-auto w-full max-w-full rounded-lg bg-grey-light",
                {
                  hidden: !imageLoaded
                }
              )}
              src={imgUrl}
              ref={this.image}
              onLoad={this.handleImageLoaded}
            />
            <div className="mt-4 text-black font-bold">{title}</div>
          </Link>
          <Link
            to={`/recipe/edit/${id}`}
            className="btn-floating btn-floating--sm absolute z-10 block pin-r pin-b mr-5 py-2 mb-2 hover:bg-grey hover:text-grey-darkest hidden group-hover:block"
          >
            <i className="fas fa-pen icon align-middle" />
          </Link>
        </div>
      );
    } else {
      return (
        <div className="group inline-block w-full m-2 p-4 after:bg-grey-light no-underline focus:outline-none cursor-default">
          <div
            className="block h-auto w-full max-w-full rounded-lg bg-grey-light"
            style={{
              height: `${Math.random() * 400 + 200}px`
            }}
          />
          <div
            className="bg-grey h-4 mt-4"
            style={{
              width: `${Math.random() * 80 + 20}%`
            }}
          />
        </div>
      );
    }
  }
}

Recipe.propTypes = {
  id: PropTypes.string,
  imgUrl: PropTypes.string,
  title: PropTypes.string
};

export default Recipe;
