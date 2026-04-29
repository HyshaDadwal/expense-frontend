import React from "react";
import Login from "./Login";
import AddExpense from "./AddExpense";
import Expenses from "./Expenses";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-blue-600 text-white p-4 text-xl font-semibold text-center shadow">
        Expense Tracker
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6 space-y-8">

        <Login />
        <AddExpense />
        <Expenses />
        <Dashboard />

      </div>
    </div>
  );
}

export default App;