import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

class TiledRecipes extends Component {
  getImgUrl = array => {
    let imgUrl = [];

    array.forEach(recipe => {
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
    } else if (imgUrl.length == 0) {
      let newImgUrlArray = [];
      for (let i = 0; i < 260; i++) {
        newImgUrlArray = [...newImgUrlArray, ""];
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
    // const { imgUrl } = this.state;
    const { recipes } = this.props;
    if (recipes) {
      const imgUrl = this.getImgUrl(recipes);
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
                  background: "#efefef",
                  backgroundImage: img && `url(${img})`,
                  backgroundSize: "cover"
                }}
              />
            ))}
          </div>
        </div>
      );
    } else {
      //@placeholder
      const imgUrl = this.getImgUrl([]);
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
}

TiledRecipes.propTypes = {
  recipes: PropTypes.array
};

export default TiledRecipes;
