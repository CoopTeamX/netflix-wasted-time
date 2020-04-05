import React from "react";
import BarChart from "./BarChart/BarChart";
import Conclusion from "./Conclusion/Conclusion";
import PieChart from "./PieChart/PieChart";
import StatsNumber from "./StatsNumber/StatsNumber";
import "./StatsPage.scss";

export default class StatsPage extends React.Component {
  constructor() {
    super();
    this.state = {data: {}};
  }

  render() {
    const statsGenres = {
      labels: this.props.stats.genres.genreList,
      values: this.props.stats.genres.runtimeList
    };

    const statsMovies = {
      labels: ['A', 'B', 'C'],
      values: [300, 50, 100]
    };

    const statsTVShows = {
      labels: ['D', 'E', 'F'],
      values: [20, 12, 15]
    };

    const statsWeekly = {
      labels: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
      values: [1, 2, 2, 1, 3, 5, 6]
    };

    return (
      <div className="page--stats">
        <div className="stats">
          <div className="stats--runtime">
            <StatsNumber title="Total time" results={[this.props.stats.timeTotal]}/>
            <StatsNumber title="TV shows" results={[this.props.stats.timeTvShows]}/>
            <StatsNumber title="Movies" results={[this.props.stats.timeMovies]}/>
          </div>
          <div className="stats--charts">
            <BarChart title="Genres" data={statsGenres}/>
            <div className="stats--pies chart">
              <PieChart title="Top movies" data={statsMovies}/>
              <PieChart title="Top TV shows" data={statsTVShows}/>
            </div>
            <BarChart title="Weekly stats" data={statsWeekly}/>
          </div>
          <Conclusion stats={this.props.stats.conclusion}/>
        </div>
      </div>
    );
  }
}
