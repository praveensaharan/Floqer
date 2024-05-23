import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "@ant-design/charts";
import { Spin } from "antd";

const LineGraph = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://wax-hushed-fold.glitch.me/data"
        );
        const modifiedData = response.data.map((item, index) => ({
          ...item,
          key: index + 1,
        }));
        setData(modifiedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  const jobsData = data.map((item) => ({
    year: item.Year,
    totalJobs: item["Number of Total Jobs"],
  }));

  const salaryData = data.map((item) => ({
    year: item.Year,
    averageSalary: item["Average Salary in USD"],
  }));

  const jobsConfig = {
    data: jobsData,
    xField: "year",
    yField: "totalJobs",
    height: 400,
    yAxis: {
      title: {
        text: "Number of Total Jobs",
      },
    },
    xAxis: {
      title: {
        text: "Year",
      },
    },
    point: {
      size: 5,
      shape: "circle",
    },
  };

  const salaryConfig = {
    data: salaryData,
    xField: "year",
    yField: "averageSalary",
    height: 400,
    yAxis: {
      title: {
        text: "Average Salary in USD",
      },
      min: 0,
    },
    xAxis: {
      title: {
        text: "Year",
      },
    },
    point: {
      size: 5,
      shape: "circle",
    },
    // colorField: "type",
    // color: ["#19CDD7", "#DDB27C"],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Line Graphs</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-lg font-semibold mb-2 text-center">
              Number of Total Jobs
            </h2>
            <div className="flex justify-center">
              <Line {...jobsConfig} />
            </div>
          </div>
          <div className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-lg font-semibold mb-2 text-center">
              Average Salary in USD
            </h2>
            <div className="flex justify-center">
              <Line {...salaryConfig} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LineGraph;
