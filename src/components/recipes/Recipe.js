import React from "react";
import withSize from "react-sizeme";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const Recipe = props => {
  const { id, imgUrl, size, width, height, title } = props;
  const waitingHeight = ((size.width - 10) * height) / width;

  return (
    <Link
      to={`/recipe/${id}`}
      className="group inline-block w-full m-2 p-4 after:bg-grey-light no-underline focus:outline-none"
    >
      <button className="btn btn--accent absolute z-10 pin-t pin-r mt-8 mr-8 p-3 hidden group-hover:block">
        <i className="fas fa-thumbtack icon" />
        Enregistrer
      </button>
      <div
        className="block h-auto w-full max-w-full rounded-lg "
        style={{
          height: `${waitingHeight}px`,
          background: `#dae1e7 url(${imgUrl})`,
          backgroundSize: "cover"
        }}
      />
      <div className="mt-4 text-black font-bold">{title}</div>
      <button className="btn-floating btn-floating--sm absolute z-10 block pin-r pin-b mr-5 mb-2 hover:bg-grey hover:text-grey-darkest hidden group-hover:block">
        <i className="fas fa-pen icon align-middle" />
      </button>
    </Link>
  );
};

Recipe.propTypes = {
  id: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  size: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

export default withSize()(Recipe);
