import React, { Component } from "react";
import PropTypes from "prop-types";

class UserHeader extends Component {
  render() {
    const {
      avatar,
      username,
      recipes,
      boards
      // subscriptions,
      // subscribers
    } = this.props;

    if (username) {
      return (
        <div className="container">
          <div className="relative z-2 md:w4/5 max-w-lg mx-auto -mt-20 mb-8 p-4 sm:-mt-24 text-center md:text-left">
            <div
              className="sm:inline-block h-32 w-32 rounded-full border-4 border-white mx-auto sm:h-48 sm:w-48 sm:border-8"
              style={{
                background: `#efefef`,
                backgroundImage: `url(${avatar})`,
                backgroundSize: "cover"
              }}
            />
            <div className="inline-block mt-4 sm:mt-24 pl-4 align-top md:w-3/5">
              <h1 className="text-3xl sm:text-5xl font-bold mb-4">
                {username}
              </h1>
              <ul className="block min-w-10 mt-4 p-0">
                {recipes ? (
                  <li className="list-infos-item">
                    {`${recipes.length} recette${
                      recipes.length > 1 ? "s" : ""
                    }`}{" "}
                  </li>
                ) : (
                  <li className="list-infos-item">0 recette</li>
                )}
                {boards ? (
                  <li className="list-infos-item">
                    {`${boards.length} tableau${boards.length > 1 ? "x" : ""}`}{" "}
                  </li>
                ) : (
                  <li className="list-infos-item">0 tableau</li>
                )}
                {/* {subscriptions ? (
                  <li className="list-infos-item">
                    {`${subscriptions.length} abonnement${
                      subscriptions.length > 1 ? "s" : ""
                    }`}{" "}
                  </li>
                ) : (
                  <li className="list-infos-item">0 abonnement</li>
                )}
                {subscribers ? (
                  <li className="list-infos-item">{`${subscribers.length} abonné${
                    subscribers.length > 1 ? "s" : ""
                  }`}</li>
                ) : (
                  <li className="list-infos-item">0 abonné</li>
                )} */}
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="relative z-2 md:w4/5 max-w-lg mx-auto -mt-20 mb-8 p-4 sm:-mt-24 text-center md:text-left">
            <div
              className="sm:inline-block h-32 w-32 rounded-full border-4 border-white mx-auto sm:h-48 sm:w-48 sm:border-8 "
              style={{
                background: `#efefef`,
                backgroundSize: "cover"
              }}
            />
            <div className="inline-block mt-4 md:mt-24 pl-4 align-top md:w-3/5">
              <div className="h-6 w-4/5 font-bold mb-2 bg-grey-lighter" />
              <div className="h-6 w-2/5 font-bold mb-4 bg-grey-lighter" />
              <ul className="block min-w-10 mt-6 p-0">
                <li className="inline-block w-24 h-3 mb-2 bg-grey-light mr-4" />
                <li className="inline-block w-24 h-3 mb-2 bg-grey-light mr-4" />
                {/* <li className="inline-block w-24 h-3 mb-2 bg-grey-light mr-4" />
                <li className="inline-block w-24 h-3 mb-2 bg-grey-light mr-4" /> */}
              </ul>
            </div>
          </div>
        </div>
      );
    }
  }
}

UserHeader.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string,
  recipes: PropTypes.array,
  boards: PropTypes.array,
  subscriptions: PropTypes.array,
  subscribers: PropTypes.array
};

export default UserHeader;
