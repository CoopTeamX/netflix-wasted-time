import React from "react";
import { Bar } from 'react-chartjs-2';

export default class BarChart extends React.Component {
  render() {
    // you only have to set those values thanks to this.props

    const data = {
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

      maintainAspectRatio: true
    };

    return (
      <div className="chart stats--bar-chart">
        <div className="stats--title">{this.props.title}</div>
        <div className="stats--legend-bar">Minutes</div>
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
