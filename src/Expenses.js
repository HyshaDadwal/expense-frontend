import React, { useEffect, useState } from "react";
import API from "./api";

function Expenses() {
  const token = localStorage.getItem("token");
  
  const [expenses, setExpenses] = useState([]);

  // Filters
  const [categoryFilter, setCategoryFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    amount: "",
    category: "",
    description: ""
  });

  // Fetch expenses
  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expense");
      setExpenses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
    fetchExpenses();
    }
  }, [token]);

  // Delete
  const handleDelete = async (id) => {
    try {
      await API.delete(`/expense/${id}`);
      alert("Deleted!");
      fetchExpenses();
    } catch (err) {
      console.log(err);
      alert("Error deleting");
    }
  };

  // Update
  const handleUpdate = async (id) => {
    try {
      await API.put(`/expense/${id}`, {
        ...editData,
        date: new Date().toISOString().split("T")[0]
      });

      alert("Updated!");
      setEditingId(null);
      fetchExpenses();
    } catch (err) {
      console.log(err);
      alert("Error updating");
    }
  };

  // Apply Filters
  const filteredExpenses = expenses.filter((exp) => {

    const matchesCategory =
      categoryFilter === "" ||
      exp.category.toLowerCase().includes(categoryFilter.toLowerCase());

    const matchesFromDate =
      fromDate === "" || exp.date >= fromDate;

    const matchesToDate =
      toDate === "" || exp.date <= toDate;

    return matchesCategory && matchesFromDate && matchesToDate;
  });

  const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  if (!token) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold text-gray-600">
        Please login first
        </h2>
      </div>
    );
  }

  return (
  <div className="bg-white p-6 rounded-2xl shadow">

    <h2 className="text-2xl font-bold mb-4">My Expenses</h2>
    
    <div className="bg-blue-500 text-white p-4 rounded-xl shadow mb-4 text-center">
      <p className="text-sm">Total Spending</p>
      <h2 className="text-2xl font-bold">₹{total}</h2>
    </div>

    {/* 🔍 FILTER UI */}
    <div className="bg-gray-100 p-4 rounded-xl mb-6">
      <h3 className="text-lg font-semibold mb-3">Filters</h3>

      <div className="flex flex-wrap gap-3">

        <input
          className="border p-2 rounded-lg"
          placeholder="Category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 rounded-lg"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 rounded-lg"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          onClick={() => {
            setCategoryFilter("");
            setFromDate("");
            setToDate("");
          }}
        >
          Reset
        </button>

      </div>
    </div>

    {/* 📋 EXPENSE LIST */}
    {filteredExpenses.length === 0 ? (
      <p className="text-center text-gray-400 mt-4">
        No expenses yet. Start adding!
      </p>
    ) : (
      <div className="space-y-4">

        {filteredExpenses.map((exp) => (
          <div
            key={exp.id}
            className="bg-gray-50 p-4 rounded-xl shadow flex justify-between items-center"
          >

            {editingId === exp.id ? (
              <div className="flex flex-wrap gap-2">

                <input
                  className="border p-2 rounded"
                  value={editData.amount}
                  onChange={(e) =>
                    setEditData({ ...editData, amount: e.target.value })
                  }
                />

                <input
                  className="border p-2 rounded"
                  value={editData.category}
                  onChange={(e) =>
                    setEditData({ ...editData, category: e.target.value })
                  }
                />

                <input
                  className="border p-2 rounded"
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                />

                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => handleUpdate(exp.id)}
                >
                  Save
                </button>

                <button
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </button>

              </div>
            ) : (
              <>
                <div>
                  <p className="font-semibold text-lg">
                    {exp.category} - ₹{exp.amount}
                  </p>
                  <p className="text-gray-600">{exp.description}</p>
                  <p className="text-sm text-gray-400">{exp.date}</p>
                </div>

                <div className="flex gap-2">

                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => {
                      setEditingId(exp.id);
                      setEditData({
                        amount: exp.amount,
                        category: exp.category,
                        description: exp.description
                      });
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(exp.id)}
                  >
                    Delete
                  </button>

                </div>
              </>
            )}

          </div>
        ))}

      </div>
    )}

  </div>
);
}

export default Expenses;