import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Paper, useTheme } from "@material-ui/core";
import { tokens } from "../theme";

const PopulationGraph = (url) => {
  const [data, setData] = useState(null);
  const chartContainer = useRef(null);
  const theme = useTheme();
  const color = tokens(theme.palette.mode);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
        );
        const jsonData = await response.json();
        setData(jsonData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let chart = null;

    if (data && chartContainer.current) {
      const ctx = chartContainer.current.getContext("2d");
      chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: data.map((entry) => entry.Year),
          datasets: [
            {
              label: "Population",
              data: data.map((entry) => entry.Population),
              borderColor: `${color.greenAccent[900]}`,
              backgroundColor: `${color.greenAccent[600]}`,
              borderWidth: 1,
            },
          ],
        },

        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [data]);

  return (
    <Paper
      style={{
        backgroundColor: "transparent",
        boxShadow: "none",
        height: "50%",
      }}
    >
      <canvas id="myChart" ref={chartContainer} />
    </Paper>
  );
};

export default PopulationGraph;
