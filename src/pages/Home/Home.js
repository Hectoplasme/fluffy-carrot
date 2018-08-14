import React, { Component } from 'react';


import RecipeList from '../../components/RecipeList/RecipeList';

class Home extends Component {
  render() {
    return (
      <div className="main main-home">
        <RecipeList data={this.props.data}/>
      </div>
    );
  }
}

export default Home;