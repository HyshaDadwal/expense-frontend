import { Link } from "react-router-dom";

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Expense Tracker</h1>

      <div className="flex gap-4">
        <Link to="/expenses">Expenses</Link>
        <Link to="/add">Add</Link>
        <Link to="/dashboard">Dashboard</Link>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}