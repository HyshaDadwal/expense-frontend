import React, { useState } from "react";
import API from "./api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      console.log("LOGIN RESPONSE:", res.data);

      localStorage.setItem("token", res.data);
      alert("Login successful!");
      window.location.href = "/expenses";

    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  const handleRegister = async () => {
  try {
    await API.post("/auth/register", {
      email,
      password
    });

    alert("User registered successfully!");
  } catch (err) {
    console.log(err);
    alert("Error registering user");
  }
};

  return (
  <div className="bg-white p-5 rounded-2xl shadow max-w-sm mx-auto">
    <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

    <input
      className="border p-2 rounded-lg w-full mb-3"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      type="password"
      className="border p-2 rounded-lg w-full mb-3"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button
      className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
      onClick={handleLogin}
    >
      Login
    </button>

    <button
      className="bg-green-500 text-white w-full py-2 rounded-lg mt-3 hover:bg-green-600"
      onClick={handleRegister}
    >
      Register
    </button>

  </div>
);
}

export default Login;