import React from "react";

const LineGraph = () => {
  const data = [
    { x: 1, y: 10 },
    { x: 2, y: 5 },
    { x: 3, y: 15 },
    { x: 4, y: 8 },
    { x: 5, y: 12 },
  ];

  const parentDivWidth = 400;
  const parentDivHeight = 300;
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const chartWidth = parentDivWidth - margin.left - margin.right;
  const chartHeight = parentDivHeight - margin.top - margin.bottom;

  // Calculate the maximum and minimum values of x and y
  const maxX = Math.max(...data.map((d) => d.x));
  const minX = Math.min(...data.map((d) => d.x));
  const maxY = Math.max(...data.map((d) => d.y));
  const minY = Math.min(...data.map((d) => d.y));

  // Create scale functions for x and y axes
  const xScale = (x) => margin.left + ((x - minX) / (maxX - minX)) * chartWidth;
  const yScale = (y) =>
    margin.top + chartHeight - ((y - minY) / (maxY - minY)) * chartHeight;

  // Generate path data for the line
  const linePath =
    "M" + data.map((d) => `${xScale(d.x)},${yScale(d.y)}`).join("L");

  return (
    <div
      style={{
        width: parentDivWidth,
        height: parentDivHeight,
        border: "1px solid gray",
      }}
    >
      <svg width={parentDivWidth} height={parentDivHeight}>
        <g>
          <path d={linePath} fill="none" stroke="blue" strokeWidth="2" />
          {data.map((d) => (
            <circle
              key={`${d.x}-${d.y}`}
              cx={xScale(d.x)}
              cy={yScale(d.y)}
              r="4"
              fill="blue"
            />
          ))}
          <text
            x={parentDivWidth / 2}
            y={parentDivHeight - 20}
            textAnchor="middle"
            dominantBaseline="hanging"
          >
            X Axis
          </text>
          <text
            x={margin.left - 10}
            y={parentDivHeight / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(-90, ${margin.left - 10}, ${
              parentDivHeight / 2
            })`}
          >
            Y Axis
          </text>
        </g>
      </svg>
    </div>
  );
};

export default LineGraph;
