import React, { Component } from "react";
import { Link } from "react-router-dom";

//Components
import List from "../layout/List";
import Recipes from "../recipes/Recipes";

//Data placeholder
const recipes = [
  {
    id: "recipe-1",
    title: "Pâtes à la carbonara",
    imgUrl: "https://picsum.photos/200/300/?random",
    height: 300,
    width: 200
  },
  {
    id: "recipe-2",
    title: "Pâtes bolognaise",
    imgUrl: "https://picsum.photos/500/500/?random",
    height: 500,
    width: 500
  },
  {
    id: "recipe-3",
    title: "Risotto au poulet",
    imgUrl: "https://picsum.photos/300/400/?random",
    height: 400,
    width: 300
  },
  {
    id: "recipe-4",
    title: "Risotto aux champignons",
    imgUrl: "https://picsum.photos/200/400/?random",
    height: 400,
    width: 200
  },
  {
    id: "recipe-5",
    title: "Pâtes à la carbonara",
    imgUrl: "https://picsum.photos/200/300/?random",
    height: 300,
    width: 200
  }
];

class Recipe extends Component {
  render() {
    return (
      <div
        className="bg-grey-light min-h-screen pt-8"
        style={{
          background: "linear-gradient(#dae1e7, white)"
        }}
      >
        <div className="px-4">
          <div className="max-w-lg mx-auto p-4 pb-4 bg-white rounded-lg mx-4 mt-12 mb-20 lg:mt-0">
            <div className="pr-4 mb-4 flex items-center">
              <Link
                to="/"
                className="link absolute 
              pin-l overflow-hidden pr-4 
              -mt-20
              lg:-mt-6
              ml-4
              text-black 
              hover:bg-transparent
              after:bg-grey-light"
              >
                <i className=" fas fa-chevron-left inline-block -ml-1 -mt-1 mr-2 text-2xl align-middle" />
                <span> Accueil</span>
              </Link>
              <button className="btn-floating h-12 w-12 text-2xl mr-2 ml-2">
                <i className="fas fa-pen icon" />
              </button>
              <button className="btn-floating h-12 w-12 text-2xl mr-2 sm:hidden">
                <i className="fas fa-share-alt icon" />
              </button>
              <button className="hidden sm:inline-block btn ml-auto mr-2">
                <i className="fas fa-share-alt icon" />
                Partager
              </button>
              <button className="btn btn--accent absolute pin-r mr-16 mt-20 sm:relative sm:pin-none sm:mt-0 sm:mr-0">
                <i className="fas fa-thumbtack icon" />
                Enregistrer
              </button>
            </div>

            <div className="flex flex-strech flex-col md:flex-row mb-4">
              <div className="inline-flex items-center justify-center md:w-3/5 mx-0 p-4 pt-0">
                <img
                  className="bg-grey-light rounded-lg"
                  src="https://picsum.photos/800/1200/?random"
                  alt="titre"
                />
              </div>
              <div className="inline-block md:w-2/5 mx-0 px-4">
                <div className="flex  items-center mb-4">
                  <div
                    className="flex-no-shrink h-12 w-12 sm:h-16 sm:w-16 mr-2 md:mr-4 rounded-full bg-grey-light"
                    style={{
                      background: `#dae1e7 url(https://picsum.photos/400/400/?random)`,
                      backgroundSize: "cover"
                    }}
                  />
                  <p>
                    <span className="font-bold">Vous</span> avez enregistré
                    cette recettes dans{" "}
                    <span className="font-bold">Recettes de pâtes</span>
                  </p>
                </div>
                <h1 className="text-2xl sm:text-3xl mb-2">
                  Champignons farcis au pesto d'avocat et basilic
                </h1>
                <ul className="p-0 mb-4">
                  <li className="inline-block block">
                    <Link
                      to="/"
                      className="text-xs tracking-wide uppercase text-purple-dark no-underline pl-2 hover:text-purple-darker"
                    >
                      #champignons
                    </Link>
                  </li>
                </ul>
                <p className="text-xl pb-5 border-b border-grey-light">
                  Ces petits champignons sont totalement vegans et parfaits pour
                  des apéros sains. L'avocat riche en bonne graisse et les
                  champignons riches en fibres font de ces petites bouchées un
                  apéro très rassasiant pour un Indice Glycémique quasi nul.
                </p>
                <ul className="py-5 px-0  border-b border-grey-light">
                  <li className="block mb-2 font-bold text-lg">
                    <i className="far fa-smile mr-2" />
                    Pour 4 personnes
                  </li>
                  <li className="block mb-2 font-bold text-lg">
                    <i className="far fa-clock mr-2" />
                    23 min
                  </li>
                  <li className="block font-bold text-lg">
                    <i className="far fa-hand-peace mr-2" />
                    Facile
                  </li>
                </ul>
              </div>
            </div>

            <div className="inline-block px-4 border-b border-grey-light md:border-0 md:w-1/3 mx-0 align-top">
              <List
                title="Ingrédients"
                icon="cookie-bite"
                items={[
                  "12 champignons de Paris",
                  "1/2 avocat mûr",
                  "1 cuil. à soupe de jus de citron vert",
                  "1 gousse d'ail",
                  "1 botte de basilic"
                ]}
              />

              <List
                title="Matériel"
                icon="utensils"
                items={["Sac congélation", "Mini-mixeur"]}
              />
            </div>
            <div className="inline-block md:w-2/3 mx-0">
              <List
                title="Préparation"
                items={[
                  "Préchauffez le four à 210°C(th. 7). Lavez délicatement les champignons sous un filet d'eau froide. Séchez-les avec du papier absorbant. Retirez le pied de chaque champignon avec la main, en le tournant légèrement.",
                  "Disposez les têtes de champignons sur une plaque recouverte de papier sulfurisé, dos vers le haut. Enfournez pour 8 min. Placez ensuite les champignons sur du papier absorbant dans la même position que dans le four, afin de les laissez refroidir et se vider de leur eau.",
                  "Quand ils sont complètements froids, retirez l'humidité des champignons à l'aide de papier absorbant, en tapotant légèrement à l'intérieur.",
                  "Dans un mini-mixeur, placez le demi-avocat, le jus de citron vert, la gousse d'ail dégermée, le basiic, le paprika et le sel, pluis mixez jusqu'à l'obtention d'une texture lisse et crémeuse",
                  "Mettez le mélange dans un petit sac de congélation, et poussez vers un angle du sac. Coupez le bout de l'angle avec un ciseau.",
                  "A l'aide de cette poche à douille maison, garnissez les champignons, puis réservez au frais.",
                  "Servez avec un filet d'huile d'olive et saupoudrez d'un peu de paprika"
                ]}
              />
            </div>
          </div>
        </div>
        <div className="max-w-lg mx-auto text-2xl font-bold px-4">
          Plus de ce genre
        </div>
        <Recipes recipes={recipes} />
      </div>
    );
  }
}

export default Recipe;
