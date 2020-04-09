import React from "react";
import { Pie } from 'react-chartjs-2';

export default class PieChart extends React.Component {
	constructor() {
		super();
		this.state = {expressedInHours: false}
	}

	needToConvertToHours = () => {
		if(this.state.expressedInHours) return true;

		var i = 0;
		while (i < this.props.data.values.length) {
			if(this.props.data.values[i] > 240) {
				this.setState({expressedInHours: true});
				return true;
			}
			i++;
		}
		return false;
	}
		
	componentDidMount() {
		if (this.needToConvertToHours()) {
			this.props.data.values = this.props.data.values.map(value => Math.trunc(value / 60));
			this.forceUpdate();
		}
	}

  render() {
    const data = {
		labels: this.props.data.labels,
		datasets: [{
			data: this.props.data.values,
			backgroundColor: "#7C87D7",
			hoverBackgroundColor: "#FF786B"
		}]
	};

	const self = this;

	const options = {
		legend: {
			display: false
		},
		tooltips: {
			enabled: true,
			mode: 'single',
			callbacks: {
				label: function(tooltipItem, data) { 
					var indice = tooltipItem.index;
					const suffix = self.state.expressedInHours ? ' h' : ' min';
					return data.datasets[0].data[indice] + suffix;
				}
			}
		},
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
