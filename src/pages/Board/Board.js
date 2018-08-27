import React, { Component } from "react";

//Fake data for placeholder
import data from "../../data";

//CSS
import "./Board.css";

//Components
import RecipeList from "../../components/RecipeList/RecipeList";

class Board extends Component {
  render() {
    return (
      <div className="main main-board">
        <div className="board-header container container--thin">
          <div className="board-toolbar">
            <div className="board-toolbar-icons">
              <button className="btn btn-floating">
                <i className="icon fas fa-pen" />
              </button>
              <button className="btn btn-floating only-on-mobile">
                <i className="icon fas fa-share-alt" />
              </button>
              <button className="btn hidden-on-mobile">
                <i className="icon fas fa-share-alt" />
                Partager
              </button>
            </div>
          </div>
          <div className="board-infos">
            <div className="board-infos-left">
              <h1 className="board-title heading-3">Recettes de pâtes</h1>
              <div className="board-infos-recipes infos-list-item">
                135 épingles
              </div>
            </div>
            <div className="board-infos-right hidden-on-mobile">
              <img
                src="https://picsum.photos/400/400/?random"
                alt=""
                className="avatar avatar--small"
              />
            </div>
          </div>
        </div>
        <div className="board-body container">
          <RecipeList recipes={data.recipes} />
        </div>
      </div>
    );
  }
}

export default Board;
