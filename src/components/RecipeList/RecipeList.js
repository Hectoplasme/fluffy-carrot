import React, { Component } from 'react';
import './RecipeList.css';
import RecipeCard from './RecipeCard/RecipeCard';

import Masonry from 'react-masonry-css';


class RecipeList extends Component {
	render() {
		const breakpointColumnsObj = {
			default : 5,
			850 : 4,
			500 : 3,
			350 : 2
		};
		return (
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
		);
	}
}

export default RecipeList;