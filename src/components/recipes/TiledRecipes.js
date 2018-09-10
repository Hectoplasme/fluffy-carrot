import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

//Data placeholder
//@ To-do get recipes img url from user data
const recipes = [
  {
    id: "recipe-1",
    title: "Pâtes à la carbonara",
    imgUrl: "https://picsum.photos/200/300/?random",
    height: 300,
    width: 200
  },
  {
    id: "recipe-2",
    title: "Pâtes bolognaise",
    imgUrl: "https://picsum.photos/500/500/?random",
    height: 500,
    width: 500
  },
  {
    id: "recipe-3",
    title: "Risotto au poulet",
    imgUrl: "https://picsum.photos/300/400/?random",
    height: 400,
    width: 300
  },
  {
    id: "recipe-4",
    title: "Risotto aux champignons",
    imgUrl: "https://picsum.photos/200/400/?random",
    height: 400,
    width: 200
  },
  {
    id: "recipe-5",
    title: "Pâtes à la carbonara",
    imgUrl: "https://picsum.photos/200/300/?random",
    height: 300,
    width: 200
  }
];

class TiledRecipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgUrl: this.getImgUrl()
    };
  }

  getImgUrl = () => {
    let imgUrl = [];

    recipes.forEach(recipe => {
      imgUrl.push(recipe.imgUrl);
    });

    //Check if there is enough images to fill the header
    if (imgUrl.length > 260) {
      imgUrl.slice(0, 259);
    } else if (imgUrl.length > 0) {
      //Fill the array to fill the header
      this.shuffle(imgUrl);
      let newImgUrlArray = [];
      for (let i = 0; i < 260 / imgUrl.length; i++) {
        newImgUrlArray = [...newImgUrlArray, ...imgUrl];
      }
      imgUrl = newImgUrlArray;
    }

    return this.shuffle(imgUrl);
  };

  shuffle = array => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  render() {
    const { imgUrl } = this.state;

    return (
      <div className="relative h-96 overflow-hidden">
        <div
          className="relative flex flex-col flex-wrap"
          style={{
            top: "-200%",
            left: "-10%",
            width: "150%",
            height: "500%",
            transform: "rotate(-25deg)"
          }}
        >
          {imgUrl.map((img, i) => (
            <div
              key={`tile-${i}`}
              className={classnames("w-32 h-48 m-1 rounded-lg", {
                "pouet-9 -mt-16 mb-2":
                  (i + 1) % 9 === 1 && !((i + 1) % (2 * 9) === 1)
              })}
              style={{
                background: img ? `#efefef url(${img})` : "#efefef",
                backgroundSize: "cover"
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}

TiledRecipes.propTypes = {
  user: PropTypes.string.isRequired
};

export default TiledRecipes;
