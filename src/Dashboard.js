import React, { useEffect, useState } from "react";
import API from "./api";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function Dashboard() {
  const token = localStorage.getItem("token");

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (token) {
    fetchExpenses();
    }
  }, [token]);

  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expense");
      setExpenses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Category-wise aggregation
  const categoryData = {};
  expenses.forEach((exp) => {
    categoryData[exp.category] =
      (categoryData[exp.category] || 0) + exp.amount;
  });

  const pieData = {
  labels: Object.keys(categoryData),
  datasets: [
    {
      data: Object.values(categoryData),
      backgroundColor: [
        "#3b82f6", // blue
        "#22c55e", // green
        "#f59e0b", // yellow
        "#ef4444", // red
        "#8b5cf6", // purple
        "#ec4899"  // pink
      ]
    }
  ]
};

  // Date-wise aggregation
  const dateData = {};
  expenses.forEach((exp) => {
    dateData[exp.date] =
      (dateData[exp.date] || 0) + exp.amount;
  });

  const sortedDates = Object.keys(dateData).sort();

const barData = {
  labels: sortedDates,
  datasets: [
    {
      label: "Daily Spending",
      data: sortedDates.map(date => dateData[date]),
      backgroundColor: "#3b82f6"
    }
  ]
};

  // Total
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  if (!token) {
    return <h2>Please login first</h2>;
  }

  return (
  <div className="bg-white p-6 rounded-2xl shadow">

    <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

    {/* TOTAL CARD */}
    <div className="bg-green-500 text-white p-4 rounded-xl shadow mb-6 text-center">
      <h3 className="text-lg">Total Spending</h3>
      <p className="text-2xl font-bold">₹{total}</p>
    </div>

    {/* CHARTS GRID */}
    <div className="grid md:grid-cols-2 gap-6">

      {/* PIE CHART */}
      <div className="bg-gray-50 p-4 rounded-xl shadow">
        <h4 className="text-lg font-semibold mb-3 text-center">
          Category-wise Spending
        </h4>

        <div className="flex justify-center">
          <div className="w-64">
            <Pie data={pieData} />
          </div>
        </div>
      </div>

      {/* BAR CHART */}
      <div className="bg-gray-50 p-4 rounded-xl shadow">
        <h4 className="text-lg font-semibold mb-3 text-center">
          Daily Spending
        </h4>

        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <Bar data={barData} />
          </div>
        </div>
      </div>

    </div>

  </div>
);
}

export default Dashboard;