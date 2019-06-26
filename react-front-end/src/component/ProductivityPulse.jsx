import React, { Component } from "react";
import axios from "axios";
import { builtinModules } from "module";
import { Pie } from "react-chartjs-2";

import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Card,
  Row,
  Col,
  Statistic
} from "antd";

const chartOptions = {
  legend: {
    display: true
  },

  pieceLabel: {
    render: "percentage",
    fontColor: ["white"],
    precision: 2
  },

  tooltips: {
    enabled: false
  },

  scales: {
    yAxes: [
      {
        ticks: {
          display: false
        },
        gridLines: {
          drawBorder: false,
          zeroLineColor: "transparent",
          color: "rgba(255,255,255,0.05)"
        }
      }
    ],

    xAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(255,255,255,0.1)",
          zeroLineColor: "transparent"
        },
        ticks: {
          display: false
        }
      }
    ]
  }
};

class Productivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productivity: null
    };
  }

  dashboardProductivityChart = {
    data: canvas => {
      return {
        labels: ["Productive", "Distracting", "Neutral", "Unclassified"],
        datasets: [
          {
            label: "Emails",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: ["#e3e3e3", "#4acccd", "#fcc468", "#ef8157"],
            borderWidth: 0,
            data: canvas
          }
        ]
      };
    }
  };

  fetchProductivityData = () => {
    axios
      .get("/api/productivity_pulse") // You can simply make your requests to "/api/whatever you want"
      .then(response => {
        const mappedData = response.data.rows.map(RTdata => RTdata[1]);
        const productivityData = this.dashboardProductivityChart.data(
          mappedData
        );
        this.setState({
          productivity: productivityData
        });
      });
  };

  componentWillMount() {
    this.fetchProductivityData();
  }

  render() {
    console.log("a", this.state.productivity && this.state.productivity.data);
    return (
      <div className="App">
        {this.state.productivity && (
          <Pie
            data={this.state.productivity}
            options={chartOptions}
            height={168}
          />
        )}
      </div>
    );
  }
}

export default Productivity;
