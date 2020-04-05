import HomePage from "../HomePage/HomePage";
import Processor from "../../Processor/Processor";
import React from "react";
import StatsPage from "../StatsPage/StatsPage";
import rawActivities from "../../data/activities.json";

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

  /**
   * (Lire $Number pages de ton livre, 15)
   * return {"first":" Lire", "second":15, "third": pages de ton livre"}
   */
  getFormatedComparison = (phrase, value) => {
    const partsPhrase = phrase.split("$Number");
    return {
      "first": partsPhrase[0],
      "second": value < 5 ? (Math.round(value * 100)/100) : Math.trunc(value),
      "third": partsPhrase[1]
    }
  }

  // first, second, third

  getFormatedData = (data) => {
    return {
      "timeTotal": this.getDisplayedTime(data.runtimes.total),
      "timeTvShows": this.getDisplayedTime(data.runtimes.tvShows),
      "timeMovies": this.getDisplayedTime(data.runtimes.movies),
      "genres": {
        "genreList": data.genres.map(genre => genre.genre),
        "runtimeList": data.genres.map(genre => genre.runtime),
      },
      "movies": {
        "movieList": data.movies.map(movie => movie.title),
        "runtimeList": data.movies.map(movie => movie.totalRuntime),
      },
      "tvShows": {
        "tvShowList": data.tvShows.map(tvShow => tvShow.title),
        "runtimeList": data.tvShows.map(tvShow => tvShow.totalRuntime),
      },
      "weekly": {
        "meanByDay": data.dates.map(mean => Math.trunc(mean.average))
      },
      "conclusion" : {
        "comparisons": rawActivities.activities.map(activity => this.getFormatedComparison(activity.translations.en, (data.runtimes.total / 60 / activity.runtime))),
        "countMovies": data.nMovies,
        "countTvShows": data.nTvShows,
        "countEpisodes": data.nEpisodes,
        "highScoreDay": {
          "date": data.highScoreDay,
          "runtime": this.getDisplayedTime(data.highScoreDay.runtime)
        }
      }
    }
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
