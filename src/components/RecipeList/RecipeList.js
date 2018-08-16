import React, { Component } from 'react';
import './RecipeList.css';
import RecipeCard from './RecipeCard/RecipeCard';

import Masonry from 'react-masonry-css';


class RecipeList extends Component {
	render() {
		const breakpointColumnsObj = {
			default : this.props.thin ? 3 : 6,
			1600: this.props.thin ? 3 : 5,
			1500 : this.props.thin ? 3 : 4,
			1200 : 3,
			850 : 2,
			500: 1
		};

		return (
			<Masonry 
				breakpointCols={breakpointColumnsObj} 
				className={`${this.props.className || ""} card-list clear`}
				columnClassName="card-column">
					{this.props.recipes.map((item) => {
						return <RecipeCard key={item.id} {...item} />
					})}
			</Masonry>
		);
	}
}

export default RecipeList;