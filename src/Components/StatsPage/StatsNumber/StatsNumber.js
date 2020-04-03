import React from "react";

export default class StatsNumber extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="chart stats--number">
        <div className="stats--title">{this.props.title}</div>
        <div className="result">{this.props.result}</div>
      </div>
    );
  }
}
