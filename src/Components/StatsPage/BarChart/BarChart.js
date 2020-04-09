import React from "react";
import { Bar } from 'react-chartjs-2';

export default class BarChart extends React.Component {
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
    const self = this;

    var data = {
      labels: this.props.data.labels,
      datasets: [{
        backgroundColor: 'rgba(255,255,255)',
        data: this.props.data.values,
        fontColor: "#7C87D7",
        fontSize: 24,
				hoverBackgroundColor: "#FF786B"
      }]
    };

    const options = {
      legend: {
        display: false
      },

      scales: {
        xAxes: [{
          gridLines: {
            color: "rgba(255,255,255)",
            drawOnChartArea: false,
          },
          ticks: {
            beginAtZero: true,
            fontColor: "#7C87D7",
            fontSize: 20
          }
        }],
        yAxes: [{
          color: "#7C87D7",
          gridLines: {
            color: "rgba(255,255,255)",
            drawOnChartArea: false,
          },
          ticks: {
            beginAtZero: true,
            fontColor: "#7C87D7",
            fontSize: 20,
            max: Math.max.apply(this, this.props.data.values),
            callback: function(value, index, values) {
              if (index === 0) return Math.max.apply(this, values);
              else return '';
            }
          }
        }]
      },

      maintainAspectRatio: true,

      tooltips: {
        enabled: true,
        mode: 'single',
        callbacks: {
          label: function(tooltipItems, data) { 
            const suffix = self.needToConvertToHours() ? ' h' : ' min';
              return tooltipItems.yLabel + suffix;
          }
        }
      },
    };

    return (
      <div className="chart stats--bar-chart">
        <div className="stats--title">{this.props.title}</div>
        <div className="stats--legend-bar">{this.needToConvertToHours() ? "Hours" : "Minutes"}</div>
        <Bar
          data={data}
          options={options}
          width={100}
          height={80}
        />
      </div>
    );
  }
}
