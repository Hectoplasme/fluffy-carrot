import React, { Component } from 'react';
import './RecipeList.css';
import RecipeCard from './RecipeCard/RecipeCard';

import Masonry from 'react-masonry-css';


class RecipeList extends Component {
	render() {
		const breakpointColumnsObj = {
			default : 6,
			1600: 5,
			1500 : 4,
			1200 : 3,
			850 : 2,
			500: 1
		};
		return (
			<div class="container">
				<Masonry 
					breakpointCols={breakpointColumnsObj} 
					className={`${this.props.className || ""} card-list`}
					columnClassName="card-column">
						<RecipeCard />
						<RecipeCard />
						<RecipeCard />
						<RecipeCard />
						<RecipeCard />
						<RecipeCard />
						<RecipeCard />
						<RecipeCard />
						<RecipeCard />
						<RecipeCard />
						<RecipeCard />
						<RecipeCard />
						<RecipeCard />
						<RecipeCard />
				</Masonry>
			</div>
		);
	}
}

export default RecipeList;