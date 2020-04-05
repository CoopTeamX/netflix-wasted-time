import React from "react";

export default class StatsNumber extends React.Component {
  render() {
    return (
      <div className="chart stats--number">
        <div className="stats--title">{this.props.title}</div>
        {this.props.results.map((result, key) => {
            return <div className="result">{result}</div>
        })}
      </div>
    );
  }
}
