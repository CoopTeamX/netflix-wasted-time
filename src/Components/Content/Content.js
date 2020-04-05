import HomePage from "../HomePage/HomePage";
import StatsPage from "../StatsPage/StatsPage";
import React from "react";
import Processor from "../../Processor/Processor";

export default class Content extends React.Component {
  constructor() {
    super();
    const rawData = JSON.parse(`[["Title","Date"],["How to Sell Drugs Online (Fast): Saison 1: Ou tu frappes fort, ou tu oublies","01/03/2020"],["How to Sell Drugs Online (Fast): Saison 1: Si c'est ça la réalité, non merci","01/03/2020"],["How to Sell Drugs Online (Fast): Saison 1: Pas le droit à l'erreur","01/03/2020"],["How to Sell Drugs Online (Fast): Saison 1: La vie est injuste, faut s'y faire","01/03/2020"],["How to Sell Drugs Online (Fast): Saison 1: Nerd aujourd'hui, big boss demain","01/03/2020"],["Dracula: Saison 1: Sombre boussole","29/02/2020"],["Dracula: Saison 1: Vaisseau sanguin","29/02/2020"],["Dracula: Saison 1: Les règles de la bête","29/02/2020"],["Ragnarök: Saison 1: Oui, nous aimons ce pays","18/02/2020"],["Ragnarök: Saison 1: Numéro atomique 48","18/02/2020"],["Ragnarök: Saison 1: Ginnungagap","18/02/2020"],["Ragnarök: Saison 1: Jutulheim","18/02/2020"],["Ragnarök: Saison 1: 541 mètres","18/02/2020"],["Ragnarök: Saison 1: Le nouveau","18/02/2020"],["Death Note","18/02/2020"],["DEATH NOTE: Saison 1: Nouveau monde","17/02/2020"],["DEATH NOTE: Saison 1: 28/1","17/02/2020"],["DEATH NOTE: Saison 1: Tueur","17/02/2020"],["DEATH NOTE: Saison 1: Embuscade","17/02/2020"],["DEATH NOTE: Saison 1: Arrogance","17/02/2020"],["DEATH NOTE: Saison 1: Sélection","17/02/2020"],["DEATH NOTE: Saison 1: Transfert","17/02/2020"],["DEATH NOTE: Saison 1: Justice","17/02/2020"],["DEATH NOTE: Saison 1: Père","17/02/2020"],["DEATH NOTE: Saison 1: Impatience","17/02/2020"],["DEATH NOTE: Saison 1: Enlèvement","17/02/2020"],["DEATH NOTE: Saison 1: Reprise","17/02/2020"],["DEATH NOTE: Saison 1: Silence","17/02/2020"],["DEATH NOTE: Saison 1: Résurrection","16/02/2020"],["DEATH NOTE: Saison 1: Frénésie","16/02/2020"],["DEATH NOTE: Saison 1: Conduite","16/02/2020"],["DEATH NOTE: Saison 1: Performance","16/02/2020"],["DEATH NOTE: Saison 1: Expédient","16/02/2020"],["DEATH NOTE: Saison 1: Matsuda","16/02/2020"],["DEATH NOTE: Saison 1: Allié","16/02/2020"],["DEATH NOTE: Saison 1: Exécution","16/02/2020"],["DEATH NOTE: Saison 1: Décision","16/02/2020"],["DEATH NOTE: Saison 1: Pari","16/02/2020"],["DEATH NOTE: Saison 1: Déchirure","16/02/2020"],["DEATH NOTE: Saison 1: Tactique","15/02/2020"],["DEATH NOTE: Saison 1: Poursuite","15/02/2020"],["DEATH NOTE: Saison 1: Pacte","15/02/2020"],["DEATH NOTE: Saison 1: Confrontation","15/02/2020"],["DEATH NOTE: Saison 1: Renaissance","15/02/2020"],["El Camino : Un film Breaking Bad","01/02/2020"],["Breaking Bad: Saison 5: Revenir et mourir","29/01/2020"],["Breaking Bad: Saison 5: L'origine du mal","28/01/2020"],["Breaking Bad: Saison 5: Seul au monde","28/01/2020"],["Breaking Bad: Saison 5: Règlement de compte à To’hajiilee","28/01/2020"],["Breaking Bad: Saison 5: Comme un chien enragé","28/01/2020"],["Breaking Bad: Saison 5: Confessions","28/01/2020"],["Breaking Bad: Saison 5: Enterré","28/01/2020"],["Breaking Bad: Saison 5: Le prix du sang","27/01/2020"],["Breaking Bad: Saison 5: Un nouveau jour se lève","27/01/2020"],["Breaking Bad: Saison 5: Heisenberg","27/01/2020"],["Breaking Bad: Saison 5: Divergence","26/01/2020"],["Breaking Bad: Saison 5: Un plan presque parfait","26/01/2020"],["Breaking Bad: Saison 5: Cinquante et un","26/01/2020"],["Breaking Bad: Saison 5: Nouveaux labos","26/01/2020"],["Breaking Bad: Saison 5: Madrigal","26/01/2020"],["Breaking Bad: Saison 5: Vivre libre ou mourir","24/01/2020"],["Breaking Bad: Saison 4: Mat","24/01/2020"],["Breaking Bad: Saison 4: Échec","22/01/2020"],["Breaking Bad: Saison 4: Seul contre tous","22/01/2020"],["Breaking Bad: Saison 4: Salud","22/01/2020"],["Breaking Bad: Saison 4: Incontrôlables","22/01/2020"],["Breaking Bad: Saison 4: Frères et partenaires","22/01/2020"],["Breaking Bad: Saison 4: Négociations","22/01/2020"],["Breaking Bad: Saison 4: Guerre froide","22/01/2020"],["Breaking Bad: Saison 4: Nouveau job","18/01/2020"],["Breaking Bad: Saison 4: Les points importants","18/01/2020"],["Breaking Bad: Saison 4: Motivations","18/01/2020"],["Breaking Bad: Saison 4: Snub 38","18/01/2020"],["Breaking Bad: Saison 4: Le cutter","18/01/2020"],["Breaking Bad: Saison 3: Pleine mesure","18/01/2020"],["Breaking Bad: Saison 3: Demi-mesures","18/01/2020"],["Breaking Bad: Saison 3: Société écran","16/01/2020"],["Breaking Bad: Saison 3: La mouche","16/01/2020"],["Breaking Bad: Saison 3: Kafkaïen","16/01/2020"],["Breaking Bad: Saison 2: Alibi","16/01/2020"],["Breaking Bad: Saison 2: Chasse à l'homme","10/01/2020"],["Breaking Bad: Saison 2: Traqués","10/01/2020"],["Breaking Bad: Saison 1: Chute libre","10/01/2020"],[""]]`);
    // rawData.shift();
    var data = Processor.process(rawData)
    // .then(r => {
      // data = r;
      // console.log(r);
      this.state = {data: data};
  };

  updateData = (newData) => {
    this.setState({data: newData});
  };

  render() {
    return (
      <div>
        {
          this.state && Object.keys(this.state.data).length === 0 ? <HomePage updateData={this.updateData}/> : <StatsPage/>
        }
      </div>
    );
  }
}
