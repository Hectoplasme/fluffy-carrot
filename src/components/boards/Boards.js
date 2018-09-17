import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Components
import Board from "./Board";

class Boards extends Component {
  render() {
    const { boards, add, thin } = this.props;

    const AddButton = (
      <div
        className={classnames("inline-block -ml-2 relative w-full md:pr-2", {
          "md:w-1/2 lg:w-1/3 xl:w-1/4 ": !thin,
          "lg:w-1/2": thin
        })}
      >
        <Link
          to="/board/add"
          className="group block w-full p-3 after:bg-grey-light no-underline"
        >
          <div className="flex items-center justify-center h-64 bg-grey-lighter rounded-lg text-purple group-hover:text-purple-dark">
            <i className="fas fa-plus-circle text-5xl" />
          </div>
          <div className="mt-4 text-xl text-grey-dark font-bold group-hover:text-grey-darker">
            Créer un tableau
          </div>
        </Link>
      </div>
    );

    if (boards) {
      return (
        <div
          className={classnames("flex flex-wrap mx-auto p-4 pr-6 pt-2", {
            "max-w-6xl": !thin,
            "max-w-2xl px-8 md:px-24 ": thin
          })}
        >
          {add && AddButton}
          {boards.map(board => (
            <div
              key={board.id}
              className={classnames("inline-block relative w-full pr-2 ", {
                "md:w-1/2 lg:w-1/3 xl:w-1/4 ": !thin,
                "lg:w-1/2": thin
              })}
            >
              <Board key={board.id} board={board} />
            </div>
          ))}
        </div>
      );
    } else {
      return <div>Loading Boards...</div>;
    }
  }
}

Boards.propTypes = {
  boards: PropTypes.array,
  add: PropTypes.bool
};

export default Boards;
