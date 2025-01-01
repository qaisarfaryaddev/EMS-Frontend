import React, { useState } from "react";
import { appLogout,resetLogoutState } from "../Redux/auth/logoutSlice";
import {  useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const handleLogout = async () => {
    try {
        dispatch(appLogout());
        navigate('/login');        
        dispatch(resetLogoutState());
    } catch (error) {
        console.error("Logout Failed:", error);
        dispatch(resetLogoutState());
    }

  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* EMS Display */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl sm:text-3xl font-bold flex space-x-1">
              <span className="text-red-500">E</span>
              <span className="text-blue-500">M</span>
              <span className="text-green-500">S</span>
            </h1>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>

          {/* Links and Logout */}
          <div className="hidden sm:flex sm:items-center sm:space-x-6">
            {/* Links */}
            <div className="space-x-4">
              <a href="#" className="hover:text-blue-400 font-sans ">
                DASHBOARD
              </a>
              <a href="#" className="hover:text-blue-400">
                PUNISHMENT
              </a>
              <a href="#" className="hover:text-blue-400">
                LEAVE
              </a>
            </div>
            {/* Logout */}
            <button className="px-4 py-1 bg-red-500 rounded hover:bg-red-600" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-gray-700">
          <div className="space-y-2 p-4">
            <a href="#" className="block text-white hover:text-blue-400">
              Employe
            </a>
            <a href="#" className="block text-white hover:text-blue-400">
              Punishment
            </a>
            <a href="#" className="block text-white hover:text-blue-400">
              Leave
            </a>
            <button className="w-full px-4 py-2 mt-2 text-center bg-red-500 rounded hover:bg-red-600">
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
