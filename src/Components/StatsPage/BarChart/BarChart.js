import React from "react";
import { Bar } from 'react-chartjs-2';

export default class BarChart extends React.Component {
  constructor() {
    super();
  }

  render() {
    // you only have to set those values thanks to this.props
    const labels = ['Comedy', 'Action', 'Romance', 'Fantasy'];
    const values = [34, 15, 5, 20];

    const data = {
      labels: labels,
      datasets: [{
        backgroundColor: 'rgba(255,255,255)',
        data: values,
        fontColor: "#7C87D7",
        fontSize: 24,
      }]
    };

    const options = {
      legend: {
        display: false,
        fontColor: "#7C87D7",
        fontSize: 24,
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
            max: Math.max.apply(this, values),
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
        <Bar
          data={data}
          options={options}
          width={100}
          height={50}
        />
      </div>
    );
  }
}
