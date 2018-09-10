import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";

class Board extends Component {
  state = {
    imgUrl: []
  };

  static getDerivedStateFromProps(props, state) {
    let imgUrl = [];

    //Get the 3 first recipes img url
    for (let i = 0; i < 3; i++) {
      if (props.recipes[i]) {
        //@to-do - search recipes from recipe-id
        imgUrl.push(props.recipes[i].imgUrl);
      } else {
        imgUrl.push("");
      }
    }

    return {
      imgUrl: imgUrl
    };
  }

  render() {
    const { imgUrl } = this.state;
    const { recipes, title } = this.props;
    return (
      <Link
        to="/user/board/boardid"
        className="block relative w-full p-3 no-underline text-black after:bg-grey-light group"
      >
        <div className="flex flex-col flex-wrap justify-between w-full h-64 mb-4">
          {imgUrl.map((imgUrl, i) => (
            <div
              key={`board-tile-${i}`}
              className={classnames("flex-grow w-1/3 h-1/3", {
                "w-2/3 rounded-l-lg border-r-4 border-white ": i === 0,
                "rounded-tr-lg": i === 1,
                "border-t-4 border-white rounded-br-lg": i === 2
              })}
              style={{
                background: imgUrl ? `#dae1e7 url(${imgUrl})` : `#dae1e7`,
                backgroundSize: "cover",
                flex: i === 0 ? "0 1 100%" : i === 2 ? "0 1 60%" : "0 1 39%"
              }}
            />
          ))}
        </div>
        <div className="mb-1 text-lg font-bold">{title}</div>
        <div>{`${recipes.length} recette${recipes.length > 1 ? "s" : ""}`}</div>

        <button className="btn-floating btn-floating--sm absolute z-10 block pin-r pin-b mr-5 mb-6 hover:bg-grey hover:text-grey-darkest hidden group-hover:block">
          <i className="fas fa-pen icon align-middle" />
        </button>
      </Link>
    );
  }
}

Board.propTypes = {
  recipes: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

export default Board;
