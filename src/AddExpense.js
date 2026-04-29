import React, { useState } from "react";
import API from "./api";

function AddExpense() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = async () => {
  try {
    await API.post("/expense", {
      amount,
      category,
      description,
      date: new Date().toISOString().split("T")[0]
    });

    alert("Expense added!");

    setAmount("");
    setCategory("");
    setDescription("");

    window.location.reload();

  } catch (err) {
    console.log(err);
    alert("Error adding expense");
  }
};

  return (
  <div className="bg-white p-5 rounded-2xl shadow">

    <h2 className="text-xl font-semibold mb-4">Add Expense</h2>

    <div className="flex flex-col gap-3">

      <input
        className="border p-2 rounded-lg"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        className="border p-2 rounded-lg"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        className="border p-2 rounded-lg"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        onClick={handleAdd}
      >
        Add Expense
      </button>

    </div>
  </div>
);
}

export default AddExpense;