import React from "react";
import Comparison from "./Comparison/Comparison";
import StatsNumberConclusion from "./StatsNumberConclusion/StatsNumberConclusion";

export default class Conclusion extends React.Component {
  render() {
    var dataComparison = [
      {
        "first": "Read",
        "second": "2",
        "third": "books instead."
      },
      {
        "first": "Read",
        "second": "3",
        "third": "books instead."
      }
    ];

    return (
      <div className="conclusion">
        <div style={{width: "50%", textAlign:"center"}}>
          <StatsNumberConclusion title="Resume" results={[this.props.stats.countMovies + " TV shows", this.props.stats.countEpisodes + " episodes", this.props.stats.countMovies + " movies"]}/>
          <StatsNumberConclusion title="High score day" results={["12:45"]}/>
        </div>
        <div style={{width: "35%", textAlign:"center"}}>
          <Comparison data={dataComparison}/>
        </div>
      </div>
    );
  }
}
