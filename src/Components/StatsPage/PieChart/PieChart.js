import React from "react";
import { Pie } from 'react-chartjs-2';

export default class PieChart extends React.Component {
  render() {
    const data = {
			labels: this.props.data.labels,
			datasets: [{
				data: this.props.data.values,
				backgroundColor: "#7C87D7",
				hoverBackgroundColor: "#FF786B"
			}]
		};
		
		const options = {
			legend: {
				display: false
			}
		};

    return (
      <div>
        <div className="stats--title">{this.props.title}</div>
        <div className="stats--legend">#1 {this.props.data.labels[0]}</div>
        <Pie
					data={data}
					height={50}
					options={options}
					width={100}
				/>
      </div>
    );
  }
}
