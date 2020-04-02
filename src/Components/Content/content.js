import HomePage from "../HomePage/HomePage";
import React from "react";

export default class Content extends React.Component {
  constructor() {
    super();
    this.state = {data: {}};
  };

  updateData = (newData) => {
    this.setState({data: newData});
  };

  render() {
    console.log(this.state.data);
    return (
      <div>
        {
          Object.keys(this.state.data).length === 0 ? <HomePage updateData={this.updateData}/> : <p>A venir</p>
        }
      </div>
    );
  }
}
