import React from "react";

export default class StatsNumber extends React.Component {
  constructor() {
    super();
    this.state = {data: {}};
  }

  render() {
    return (
      <div className="stats--number">
        <div className="title">{this.props.title}</div>
        <div className="result">{this.props.result}</div>
      </div>
    );
  }
}
