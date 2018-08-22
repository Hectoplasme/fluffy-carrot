import React, { Component } from 'react';

//CSS
import './RecipeList.css';

//Components
import Masonry from 'react-masonry-css';
import RecipeCard from './RecipeCard/RecipeCard';
import AddButton from '../AddButton/AddButton';



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
		const items = this.props.addEnable ? [{id: "add"}, ...this.props.recipes] : [...this.props.recipes];
	
		console.log(items);
		return (
			<Masonry 
				breakpointCols={breakpointColumnsObj} 
				className={`${this.props.className || ""} card-list clear`}
				columnClassName="card-column">
					
					{items.map((item) => {
						if (item.id==="add") {
							return <AddButton key="add-recipe" />
						} else {
							return <RecipeCard key={item.id} {...item} />
						}
					})}
			</Masonry>
		);
	}
}

export default RecipeList;