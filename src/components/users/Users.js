import React, { Component } from "react";
import PropTypes from "prop-types";

//Components
import User from "./User";

class Users extends Component {
  render() {
    const { users } = this.props;
    return (
      <div className="max-w-lg mx-auto px-8 pb-16">
        {users.map(user => (
          <User
            key={`user-${user.id}`}
            id={user.id}
            avatar={user.avatar}
            username={user.username}
          />
        ))}
      </div>
    );
  }
}

Users.propTypes = {
  users: PropTypes.array.isRequired
};

export default Users;
