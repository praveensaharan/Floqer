import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Select, Button } from "antd";
import { Link } from "react-router-dom";

const { Option } = Select;

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState(null);

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
      title: "Year",
      dataIndex: "Year",
      key: "year",
    },
    {
      title: "Number of Total Jobs",
      dataIndex: "Number of Total Jobs",
      key: "totalJobs",
    },
    {
      title: "Average Salary in USD",
      dataIndex: "Average Salary in USD",
      key: "averageSalary",
      render: (text) => parseFloat(text).toFixed(2),
    },
    {
      title: "Insights",
      dataIndex: "Insights",
      key: "insights",
      render: (text, record) => (
        <Link to={`/data/${record.Year}`}>
          <Button type="link">Details</Button>
        </Link>
      ),
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Data Table</h1>
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
