import React from "react";
import PropTypes from "prop-types";

const UserHeader = props => {
  const {
    avatar,
    username,
    recipes,
    boards,
    subscriptions,
    subscribers
  } = props;

  return (
    <div className="container">
      <div className="relative z-2 md:w4/5 max-w-lg mx-auto -mt-20 mb-8 p-4 sm:-mt-24 text-center md:text-left">
        <div
          className="sm:inline-block h-32 w-32 rounded-full border-4 border-white mx-auto sm:h-48 sm:w-48 sm:border-8"
          style={{
            background: `#efefef url(${avatar})`,
            backgroundSize: "cover"
          }}
        />
        <div className="inline-block mt-4 md:mt-24 pl-4 align-top md:w-3/5">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">{username}</h1>
          <ul className="block min-w-10 mt-6 p-0">
            <li className="list-infos-item">
              {`${recipes.length} recette${recipes.length > 1 ? "s" : ""}`}{" "}
            </li>
            <li className="list-infos-item">
              {`${boards.length} tableau${boards.length > 1 ? "x" : ""}`}{" "}
            </li>
            <li className="list-infos-item">
              {`${subscriptions.length} abonnement${
                subscriptions.length > 1 ? "s" : ""
              }`}{" "}
            </li>
            <li className="list-infos-item">{`${subscribers.length} abonné${
              subscribers.length > 1 ? "s" : ""
            }`}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

UserHeader.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  recipes: PropTypes.array.isRequired,
  boards: PropTypes.array.isRequired,
  subscriptions: PropTypes.array.isRequired,
  subscribers: PropTypes.array.isRequired
};

export default UserHeader;
