import React from "react";
import BarChart from "./BarChart/BarChart";
import StatsNumber from "./StatsNumber/StatsNumber";
import "./StatsPage.scss";

export default class StatsPage extends React.Component {
  constructor() {
    super();
    this.state = {data: {}};
  }

  render() {
    return (
      <div className="page--stats">
        <div className="stats">
          <div className="stats--runtime">
            <StatsNumber title="Total time" result="143:32"/>
            <StatsNumber title="TV shows" result="91:07"/>
            <StatsNumber title="Movie" result="52:25"/>
          </div>
          <div>
            <BarChart title="Genres"/>
          </div>
        </div>
      </div>
    );
  }
}
