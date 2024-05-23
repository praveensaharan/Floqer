import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Select } from "antd";
import { useParams, Link } from "react-router-dom";
import { Button } from "antd";
import YearLine from "./YearLine";

const { Option } = Select;

const DataTable = () => {
  const { year } = useParams(); 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://wax-hushed-fold.glitch.me/year_data/${year}`
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
  }, [year]); 

  const handleSortChange = (value) => {
    setSortColumn(value);
  };

  const columns = [
    {
      title: "Key",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Job Title",
      dataIndex: "JobTitle",
      key: "jobTitle",
    },
    {
      title: "Average Salary in USD",
      dataIndex: "Average Salary in USD",
      key: "averageSalary",
      render: (text) => parseFloat(text).toFixed(2), 
    },
    {
      title: "Total Count",
      dataIndex: "Total Count",
      key: "totalCount",
    },
  ];

  const sortedData = () => {
    if (!sortColumn) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (typeof aValue === "string") {
        return aValue.localeCompare(bValue);
      }

      return aValue - bValue;
    });
  };


  const maxJobTitle = data.reduce(
    (prev, current) =>
      prev["Total Count"] > current["Total Count"] ? prev : current,
    {}
  );
  const minJobTitle = data.reduce(
    (prev, current) =>
      prev["Total Count"] < current["Total Count"] ? prev : current,
    {}
  );
  const maxAvgSalary = data.reduce(
    (prev, current) =>
      prev["Average Salary in USD"] > current["Average Salary in USD"]
        ? prev
        : current,
    {}
  );
  const minAvgSalary = data.reduce(
    (prev, current) =>
      prev["Average Salary in USD"] < current["Average Salary in USD"]
        ? prev
        : current,
    {}
  );

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-semibold mb-2">
          🚀 Welcome to the Future of Data!
        </h1>
        <p className="text-lg text-gray-600">
          Your summary table for the year {year} awaits...
        </p>
      </div>

      <div className="mt-6 flex justify-center items-center">
        <Link
          to="/"
          className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group"
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
            Back
          </span>
          <span className="relative invisible">Button Text</span>
        </Link>
      </div>
      <div className="mb-8 p-6 bg-white rounded-lg shadow-lg flex items-center">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
            Statistics for the Year {year}
          </h3>
          <div className="flex justify-between">
            <div className="max-statistics w-1/2 pr-4 border-r border-gray-300">
              <h4 className="text-xl font-semibold text-gray-700 mb-2">
                Maximum
              </h4>
              <p className="text-lg text-gray-600 mb-2">
                <strong className="text-gray-800">Jobs:</strong>{" "}
                <span className="text-blue-500">{maxJobTitle.JobTitle}</span>
                <span className="text-gray-800">
                  ({maxJobTitle["Total Count"]} jobs)
                </span>
              </p>
              <p className="text-lg text-gray-600 mb-2">
                <strong className="text-gray-800">Avg Salary:</strong>{" "}
                <span className="text-blue-500">{maxAvgSalary.JobTitle}</span>
                <span className="text-gray-800">
                  (${maxAvgSalary["Average Salary in USD"]})
                </span>
              </p>
            </div>
            <div className="min-statistics w-1/2 pl-4">
              <h4 className="text-xl font-semibold text-gray-700 mb-2">
                Minimum
              </h4>
              <p className="text-lg text-gray-600 mb-2">
                <strong className="text-gray-800">Jobs:</strong>{" "}
                <span className="text-red-500">{minJobTitle.JobTitle}</span>
                <span className="text-gray-800">
                  ({minJobTitle["Total Count"]} jobs)
                </span>
              </p>
              <p className="text-lg text-gray-600 mb-2">
                <strong className="text-gray-800">Avg Salary:</strong>{" "}
                <span className="text-red-500">{minAvgSalary.JobTitle}</span>
                <span className="text-gray-800">
                  (${minAvgSalary["Average Salary in USD"]})
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <YearLine data={data} />
      <Select
        defaultValue="Sort by..."
        style={{ width: 200, marginBottom: 20 }}
        onChange={handleSortChange}
      >
        {columns.map((column) => (
          <Option key={column.key} value={column.dataIndex}>
            {column.title}
          </Option>
        ))}
      </Select>
      <Table
        dataSource={loading ? [] : sortedData()}
        columns={columns}
        pagination={false}
        loading={loading}
      />
    </div>
  );
};

export default DataTable;
