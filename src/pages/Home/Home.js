import React, { Component } from 'react';


import RecipeList from '../../components/RecipeList/RecipeList';

class Home extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="main main-home">
        <div className="container">
          <RecipeList recipes={this.props.data.recipes}/>
        </div>
      </div>
    );
  }
}

export default Home;