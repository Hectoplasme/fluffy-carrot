import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Components
import Board from "./Board";

class Boards extends Component {
  render() {
    const { thin, boards, add } = this.props;

    const AddButton = (
      <Link
        to="/"
        className="group block w-full p-4 after:bg-grey-light no-underline"
      >
        <div className="flex items-center justify-center h-64 bg-grey-lighter rounded-lg text-purple group-hover:text-purple-dark">
          <i className="fas fa-plus-circle text-5xl" />
        </div>
        <div className="mt-4 text-xl text-grey-dark font-bold group-hover:text-grey-darker">
          Créer un tableau
        </div>
      </Link>
    );

    if (add) {
      boards.unshift("");
    }

    return (
      <div
        className={classnames("flex flex-wrap mx-auto p-4 pr-6 pt-2", {
          "max-w-6xl": !thin,
          "max-w-2xl px-8 md:px-24 ": thin
        })}
      >
        {boards.map((board, i) => (
          <div
            key={`board-${i}`}
            className={classnames("inline-block relative w-full pr-2 ", {
              "md:w-1/2 lg:w-1/3 xl:w-1/4 ": !thin,
              "lg:w-1/2": thin
            })}
          >
            {add && i === 0 ? (
              AddButton
            ) : (
              /* @todo pass board to the component */
              <Board recipes={boards} title="Recettes de pâtes" />
            )}
          </div>
        ))}
      </div>
    );
  }
}

Boards.propTypes = {
  boards: PropTypes.array.isRequired
};

export default Boards;
