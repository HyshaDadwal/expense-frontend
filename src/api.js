import axios from "axios";

const API = axios.create({
  baseURL: "https://expense-backend-mp26.onrender.com"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token && token !== "undefined" && token !== "null") {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

let isRedirecting = false;

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      if (!isRedirecting) { 
        isRedirecting = true; 
        
        localStorage.removeItem("token"); 
        window.location.href = "/"; 
      } 
    }
    
    
    return Promise.reject(err);
  }
);

export default API;