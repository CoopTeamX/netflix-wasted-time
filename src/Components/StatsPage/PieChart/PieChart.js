import React from "react";
import { Pie } from 'react-chartjs-2';

export default class PieChart extends React.Component {
  constructor() {
    super();
  }

  render() {
    // you only have to set those values thanks to this.props

    const data = {
			labels: [
				'Red',
				'Blue',
				'Yellow'
			],
			datasets: [{
				data: [300, 50, 100],

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
        <div className="stats--legend">#1 The Avengers</div>
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
