import React, { Component } from 'react';

//CSS
import './RecipeDataList.css';

class RecipeDataList extends Component {
  render() {
    
    return (      
      <div className="recipe-sidebar-part border-bottom">
        <div className="recipe-sidebar-heading">
          {this.props.title}
        </div>
        <div className="sidebar-list">
          {this.props.items.map((item, i) => {
            if (this.props.icon) {
              return (
                <div key={`list-item-${i}`} className="sidebar-list-item">
                  <i className={`icon fas fa-${this.props.icon}`}></i>
                  {item}
                </div>
              )
            } else {
              return (
                <p key={`list-item-${i}`} className="sidebar-list-item item--numbered border-bottom">
                  <span className="step-number">{i}.</span>
                  {item}
                </p>
              )
            }
          })}

        </div>
      </div>
    );
  }
}

export default RecipeDataList;