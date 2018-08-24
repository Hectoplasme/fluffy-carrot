import React, { Component } from 'react';

//Fake data for placeholder
import data from '../../data';

//CSS
import './Recipe.css';

//Components
import RecipeToolbar from './RecipeToolbar/RecipeToolbar';
import RecipeInfos from './RecipeInfos/RecipeInfos';
import RecipeMetadata from './RecipeMetadata/RecipeMetadata';
import RecipeDataList from './RecipeDataList/RecipeDataList';
import RecipeList from '../../components/RecipeList/RecipeList';

class Recipe extends Component {
  render() {
    return (
      <div className="main main-recipe">
        <RecipeToolbar />
        <div className="container container--thin">
          <div className="recipe-header">
            <div className="recipe-header-left">
              <img src="https://picsum.photos/800/800/?random" className="recipe-img"/>
            </div>
            <div className="recipe-header-right">
              <RecipeMetadata />
              <h1 className="recipe-title heading-6">Champignons farcis au pesto d'avocat et basilic</h1>
              <p className="recipe-description text border-bottom">Ces petits champignons sont totalement vegans et parfaits pour des apéros sains. L'avocat riche en bonne graisse et les champignons riches en fibres font de ces petites bouchées un apéro très rassasiant pour un Indice Glycémique quasi nul.</p>
              <RecipeInfos />
            </div>
          </div>
          <div className="recipe-body">
            <div className="recipe-body-left">
              <RecipeDataList 
                title="Ingrédients" 
                icon="cookie-bite"
                items={[
                  "12 champignons de Paris",
                  "1/2 avocat mûr",
                  "1 cuil. à soupe de jus de citron vert",
                  "1 gousse d'ail",
                  "1 botte de basilic"
                ]}/>
              <RecipeDataList 
                title="Matériel"
                icon="utensils"
                items={[
                  "Sac congélation",
                  "Mini-mixeur"
                ]}/>
            </div>
            <div className="recipe-body-right">
              <RecipeDataList 
                title="Préparation"
                items={[
                  "Préchauffez le four à 210°C(th. 7). Lavez délicatement les champignons sous un filet d'eau froide. Séchez-les avec du papier absorbant. Retirez le pied de chaque champignon avec la main, en le tournant légèrement.",
                  "Disposez les têtes de champignons sur une plaque recouverte de papier sulfurisé, dos vers le haut. Enfournez pour 8 min. Placez ensuite les champignons sur du papier absorbant dans la même position que dans le four, afin de les laissez refroidir et se vider de leur eau.",
                  "Quand ils sont complètements froids, retirez l'humidité des champignons à l'aide de papier absorbant, en tapotant légèrement à l'intérieur.",
                  "Dans un mini-mixeur, placez le demi-avocat, le jus de citron vert, la gousse d'ail dégermée, le basiic, le paprika et le sel, pluis mixez jusqu'à l'obtention d'une texture lisse et crémeuse",
                  "Mettez le mélange dans un petit sac de congélation, et poussez vers un angle du sac. Coupez le bout de l'angle avec un ciseau.",
                  "A l'aide de cette poche à douille maison, garnissez les champignons, puis réservez au frais.",
                  "Servez avec un filet d'huile d'olive et saupoudrez d'un peu de paprika"
                ]}/>
            </div>
          </div>
        </div>
        <div className="container">
          <p className="heading-6 bold">Plus de ce genre</p>
          <RecipeList 
            recipes={data.recipes} />  
        </div>
      </div>
    );
  }
}

export default Recipe;