import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const User = props => {
  const { id, avatar, username } = props;

  return (
    <div className="text-center mb-12 sm:text-left sm:flex sm:items-center ">
      <Link
        to={`/${id}`}
        className="block h-24 w-24 mb-4 mx-auto sm:mx-0 sm:mb-0 rounded-full bg-grey-light"
        style={{
          background: `#efefef url(${avatar}`,
          backgroundSize: "cover"
        }}
      />
      <Link
        to={`/${id}`}
        className="block mb-4 px-4 sm:mb-0 text-xl font-bold no-underline text-black"
      >
        {username}
      </Link>
      <button className="btn btn--accent sm:block sm:ml-auto align-middle">
        S'abonner
      </button>
    </div>
  );
};

User.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

export default User;
