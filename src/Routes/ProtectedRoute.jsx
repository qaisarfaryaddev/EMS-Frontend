import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosApi from "../Axios/axios";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token"); 

      if (!token) {
        setIsAuthenticated(false); 
        return;
      }

      try {
        const response = await axiosApi.get("/api/v1/auth-check"); 
        if (response.status === 200) {
          setIsAuthenticated(true); 
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false); 
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-t-transparent border-blue-800 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
