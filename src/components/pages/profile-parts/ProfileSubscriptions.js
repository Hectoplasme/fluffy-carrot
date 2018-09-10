import React, { Component } from "react";

//Components
import Users from "../../users/Users";

//Data placeholder
const users = [
  {
    id: "pouet",
    avatar: "https://picsum.photos/400/400/?random",
    username: "Studio Pouet",
    recipes: ["recipe-1", "recipe-2", "recipe-4"],
    boards: [1, 2, 3, 4],
    subscriptions: ["user-1"],
    subscribers: ["user-1"]
  },
  {
    id: "isidore",
    avatar: "https://picsum.photos/600/400/?random",
    username: "Isidore la tortue",
    recipes: ["recipe-1", "recipe-2", "recipe-4"],
    boards: [1, 2, 3, 4],
    subscriptions: ["user-1"],
    subscribers: ["user-1"]
  },
  {
    id: "renard",
    avatar: "https://picsum.photos/400/800/?random",
    username: "Vincent Caduc",
    recipes: ["recipe-1", "recipe-2", "recipe-4"],
    boards: [1, 2, 3, 4],
    subscriptions: ["user-1"],
    subscribers: ["user-1"]
  }
];

class ProfileSubscriptions extends Component {
  render() {
    return (
      <div>
        <Users users={users} />
      </div>
    );
  }
}

export default ProfileSubscriptions;
