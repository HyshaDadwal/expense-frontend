import React from "react";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div className="text-center mt-10 text-red-500">
        Please login first
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;