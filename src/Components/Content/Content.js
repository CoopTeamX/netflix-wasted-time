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
    var h = Math.trunc(time / 60);
    h = h > 10 ? h : '0' + h;
    var m = Math.trunc(time % 60);
    m = m > 10 ? m : '0' + m;
    return h + ' h ' + m + ' min';
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
    const sizeList = 10;

    return {
      "timeTotal": this.getDisplayedTime(data.runtimes.total),
      "timeTvShows": this.getDisplayedTime(data.runtimes.tvShows),
      "timeMovies": this.getDisplayedTime(data.runtimes.movies),
      "genres": {
        "genreList": data.genres.slice(0, sizeList).map(genre => genre.genre),
        "runtimeList": data.genres.slice(0, sizeList).map(genre => genre.runtime),
      },
      "movies": {
        "movieList": data.movies.slice(0, sizeList).map(movie => movie.title),
        "runtimeList": data.movies.slice(0, sizeList).map(movie => movie.totalRuntime),
      },
      "tvShows": {
        "tvShowList": data.tvShows.slice(0, sizeList).map(tvShow => tvShow.title),
        "runtimeList": data.tvShows.slice(0, sizeList).map(tvShow => tvShow.totalRuntime),
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
    console.log(JSON.stringify(data));
    Processor.process(data)
    .then(res => {
      this.setState({stats: this.getFormatedData(res)});
      console.log(JSON.stringify(this.getFormatedData(res)));
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
