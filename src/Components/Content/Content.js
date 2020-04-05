import HomePage from "../HomePage/HomePage";
import StatsPage from "../StatsPage/StatsPage";
import React from "react";
import Processor from "../../Processor/Processor";

export default class Content extends React.Component {
  constructor() {
    super();
      this.state = {stats: {}};
  };

  /**
   * 128 return 2:08
   */
  getDisplayedTime = (time) => {
    const h = Math.trunc(time / 60);
    var m = time % 60;
    m = m > 10 ? m : '0' + m;
    return h + ':' + m;
  }

  getFormatedData = (data) => {
    return {
      "timeTotal": this.getDisplayedTime(data.runtimes.total),
      "timeTvShows": this.getDisplayedTime(data.runtimes.tvShows),
      "timeMovies": this.getDisplayedTime(data.runtimes.movies),
      "genres": {
        "genreList": data.genres.map(genre => genre.genre),
        "runtimeList": data.genres.map(genre => genre.runtime),
      },
      "conclusion" : {
        "countMovies": data.nMovies,
        "countTvShows": data.nTvShows,
        "countEpisodes": data.nEpisodes
      }
    }
  }

  // à supprimer
  componentDidMount () {
    var rawData = `[{"Title":"Poltergay","Date":"20/03/2020"},{"Title":"How to Sell Drugs Online (Fast): Saison 1: Ou tu frappes fort, ou tu oublies","Date":"01/03/2020"},{"Title":"How to Sell Drugs Online (Fast): Saison 1: Si c'est ça la réalité, non merci","Date":"01/03/2020"},{"Title":"How to Sell Drugs Online (Fast): Saison 1: Pas le droit à l'erreur","Date":"01/03/2020"},{"Title":"How to Sell Drugs Online (Fast): Saison 1: La vie est injuste, faut s'y faire","Date":"01/03/2020"},{"Title":"How to Sell Drugs Online (Fast): Saison 1: Nerd aujourd'hui, big boss demain","Date":"01/03/2020"},{"Title":"Dracula: Saison 1: Sombre boussole","Date":"29/02/2020"},{"Title":"Dracula: Saison 1: Vaisseau sanguin","Date":"29/02/2020"},{"Title":"Dracula: Saison 1: Les règles de la bête","Date":"29/02/2020"},{"Title":"Ragnarök: Saison 1: Oui, nous aimons ce pays","Date":"18/02/2020"},{"Title":"Ragnarök: Saison 1: Numéro atomique 48","Date":"18/02/2020"},{"Title":"Ragnarök: Saison 1: Ginnungagap","Date":"18/02/2020"},{"Title":"Ragnarök: Saison 1: Jutulheim","Date":"18/02/2020"},{"Title":"Ragnarök: Saison 1: 541 mètres","Date":"18/02/2020"},{"Title":"Ragnarök: Saison 1: Le nouveau","Date":"18/02/2020"},{"Title":"Death Note","Date":"18/02/2020"},{"Title":"DEATH NOTE: Saison 1: Nouveau monde","Date":"17/02/2020"},{"Title":"DEATH NOTE: Saison 1: 28/1","Date":"17/02/2020"},{"Title":"DEATH NOTE: Saison 1: Tueur","Date":"17/02/2020"},{"Title":"DEATH NOTE: Saison 1: Embuscade","Date":"17/02/2020"},{"Title":"DEATH NOTE: Saison 1: Arrogance","Date":"17/02/2020"},{"Title":"DEATH NOTE: Saison 1: Sélection","Date":"17/02/2020"},{"Title":"DEATH NOTE: Saison 1: Transfert","Date":"17/02/2020"},{"Title":"DEATH NOTE: Saison 1: Justice","Date":"17/02/2020"},{"Title":"DEATH NOTE: Saison 1: Père","Date":"17/02/2020"},{"Title":"DEATH NOTE: Saison 1: Impatience","Date":"17/02/2020"},{"Title":"DEATH NOTE: Saison 1: Enlèvement","Date":"17/02/2020"},{"Title":"DEATH NOTE: Saison 1: Reprise","Date":"17/02/2020"},{"Title":"DEATH NOTE: Saison 1: Silence","Date":"17/02/2020"},{"Title":"DEATH NOTE: Saison 1: Résurrection","Date":"16/02/2020"},{"Title":"DEATH NOTE: Saison 1: Frénésie","Date":"16/02/2020"},{"Title":"DEATH NOTE: Saison 1: Conduite","Date":"16/02/2020"},{"Title":"DEATH NOTE: Saison 1: Performance","Date":"16/02/2020"},{"Title":"DEATH NOTE: Saison 1: Expédient","Date":"16/02/2020"},{"Title":"DEATH NOTE: Saison 1: Matsuda","Date":"16/02/2020"},{"Title":"DEATH NOTE: Saison 1: Allié","Date":"16/02/2020"},{"Title":"DEATH NOTE: Saison 1: Exécution","Date":"16/02/2020"},{"Title":"DEATH NOTE: Saison 1: Décision","Date":"16/02/2020"},{"Title":"DEATH NOTE: Saison 1: Pari","Date":"16/02/2020"},{"Title":"DEATH NOTE: Saison 1: Déchirure","Date":"16/02/2020"},{"Title":"DEATH NOTE: Saison 1: Tactique","Date":"15/02/2020"},{"Title":"DEATH NOTE: Saison 1: Poursuite","Date":"15/02/2020"},{"Title":"DEATH NOTE: Saison 1: Pacte","Date":"15/02/2020"},{"Title":"DEATH NOTE: Saison 1: Confrontation","Date":"15/02/2020"},{"Title":"DEATH NOTE: Saison 1: Renaissance","Date":"15/02/2020"},{"Title":"El Camino : Un film Breaking Bad","Date":"01/02/2020"},{"Title":"Breaking Bad: Saison 5: Revenir et mourir","Date":"29/01/2020"},{"Title":"Breaking Bad: Saison 5: L'origine du mal","Date":"28/01/2020"},{"Title":"Breaking Bad: Saison 5: Seul au monde","Date":"28/01/2020"},{"Title":"Breaking Bad: Saison 5: Règlement de compte à To’hajiilee","Date":"28/01/2020"},{"Title":"Breaking Bad: Saison 5: Comme un chien enragé","Date":"28/01/2020"},{"Title":"Breaking Bad: Saison 5: Confessions","Date":"28/01/2020"},{"Title":"Breaking Bad: Saison 5: Enterré","Date":"28/01/2020"},{"Title":"Breaking Bad: Saison 5: Le prix du sang","Date":"27/01/2020"},{"Title":"Breaking Bad: Saison 5: Un nouveau jour se lève","Date":"27/01/2020"},{"Title":"Breaking Bad: Saison 5: Heisenberg","Date":"27/01/2020"},{"Title":"Breaking Bad: Saison 5: Divergence","Date":"26/01/2020"},{"Title":"Breaking Bad: Saison 5: Un plan presque parfait","Date":"26/01/2020"},{"Title":"Breaking Bad: Saison 5: Cinquante et un","Date":"26/01/2020"},{"Title":"Breaking Bad: Saison 5: Nouveaux labos","Date":"26/01/2020"},{"Title":"Breaking Bad: Saison 5: Madrigal","Date":"26/01/2020"},{"Title":"Breaking Bad: Saison 5: Vivre libre ou mourir","Date":"24/01/2020"},{"Title":"Breaking Bad: Saison 4: Mat","Date":"24/01/2020"},{"Title":"Breaking Bad: Saison 4: Échec","Date":"22/01/2020"},{"Title":"Breaking Bad: Saison 4: Seul contre tous","Date":"22/01/2020"},{"Title":"Breaking Bad: Saison 4: Salud","Date":"22/01/2020"},{"Title":"Breaking Bad: Saison 4: Incontrôlables","Date":"22/01/2020"},{"Title":"Breaking Bad: Saison 4: Frères et partenaires","Date":"22/01/2020"},{"Title":"Breaking Bad: Saison 4: Négociations","Date":"22/01/2020"},{"Title":"Breaking Bad: Saison 4: Guerre froide","Date":"22/01/2020"},{"Title":"Breaking Bad: Saison 4: Nouveau job","Date":"18/01/2020"},{"Title":"Breaking Bad: Saison 4: Les points importants","Date":"18/01/2020"},{"Title":"Breaking Bad: Saison 4: Motivations","Date":"18/01/2020"},{"Title":"Breaking Bad: Saison 4: Snub 38","Date":"18/01/2020"},{"Title":"Breaking Bad: Saison 4: Le cutter","Date":"18/01/2020"},{"Title":"Breaking Bad: Saison 3: Pleine mesure","Date":"18/01/2020"},{"Title":"Breaking Bad: Saison 3: Demi-mesures","Date":"18/01/2020"},{"Title":"Breaking Bad: Saison 3: Société écran","Date":"16/01/2020"},{"Title":"Breaking Bad: Saison 3: La mouche","Date":"16/01/2020"},{"Title":"Breaking Bad: Saison 3: Kafkaïen","Date":"16/01/2020"},{"Title":"Breaking Bad: Saison 2: Alibi","Date":"16/01/2020"},{"Title":"Breaking Bad: Saison 2: Chasse à l'homme","Date":"10/01/2020"},{"Title":"Breaking Bad: Saison 2: Traqués","Date":"10/01/2020"},{"Title":"Breaking Bad: Saison 1: Chute libre","Date":"10/01/2020"},{"Title":"Bienvenue à Marly Gomont","Date":"10/01/2020"},{"Title":""}]`;
    var data = JSON.parse(rawData);
    Processor.process(data)
    .then(r => {
      this.setState({stats: this.getFormatedData(r)});
    });
  }

  updateData = (data) => {
    Processor.process(data)
    .then(res => {
      this.setState({stats: this.getFormatedData(res)});
    });
  };

  render() {
    return (
      <div>
        {
          Object.keys(this.state.stats).length === 0 ? <HomePage updateData={this.updateData}/> : <StatsPage stats={this.state.stats}/>
        }
      </div>
    );
  }
}
