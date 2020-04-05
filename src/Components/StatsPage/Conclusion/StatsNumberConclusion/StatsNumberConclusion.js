import React from "react";

export default class StatsNumberConclusion extends React.Component {
  render() {
    return (
      <div className="chart stats--number--conclusion">
        <div className="stats--title">{this.props.title}</div>
        {this.props.results.map((result, key) => {
            return <div key={"concl--" + key} className="result">{result}</div>
        })}
      </div>
    );
  }
}
