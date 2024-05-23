import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";
import { Spin } from "antd";

const LineGraph = ({ data }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const frequencyData = data.map((item) => ({
    jobTitle: item.JobTitle,
    year: item.Year,
    totalCount: item["Total Count"],
  }));

  const avgSalaryData = data.map((item) => ({
    jobTitle: item.JobTitle,
    year: item.Year,
    avgSalary: item["Average Salary in USD"],
  }));

  const frequencyChartConfig = {
    data: frequencyData,
    xField: "jobTitle",
    yField: "totalCount",
    seriesField: "year",
    height: 400,
    width: 1000,
    yAxis: {
      title: {
        text: "Frequency",
      },
      min: 0, 
    },
    xAxis: {
      title: {
        text: "Job Title",
      },
    },
    point: {
      size: 5,
      shape: "circle",
    },
  };

  const avgSalaryChartConfig = {
    data: avgSalaryData,
    xField: "jobTitle",
    yField: "avgSalary",
    seriesField: "year",
    height: 400,
    width: 1000,
    yAxis: {
      title: {
        text: "Average Salary in USD",
      },
      min: 0, 
    },
    xAxis: {
      title: {
        text: "Job Title",
      },
    },
    point: {
      size: 5,
      shape: "circle",
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Line Graphs</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <div>
          <div className="bg-white shadow-md rounded-md p-4 mb-8">
            <h2 className="text-lg font-semibold mb-2 text-center">
              Frequency of Job Titles
            </h2>
            <div className="flex justify-center">
              <Line {...frequencyChartConfig} />
            </div>
          </div>
          <div className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-lg font-semibold mb-2 text-center">
              Average Salary by Job Titles
            </h2>
            <div className="flex justify-center">
              <Line {...avgSalaryChartConfig} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LineGraph;
