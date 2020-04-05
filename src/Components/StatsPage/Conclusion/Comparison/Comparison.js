import React from "react";

export default class Comparison extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="chart">
        <div className="stats--title">You could've...</div>
        <div className="comparison-content">
          {this.props.data.map((value, key) => {
            return <p key={"comp-content--" + key}>...{value.first} <span className="comparison-number">{value.second} </span><span>{value.third}</span></p>
          })}
        </div>
      </div>
    );
  }
}
