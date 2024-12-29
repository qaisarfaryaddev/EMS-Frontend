import React, { useState, useEffect } from 'react';
import { appLogin, reset } from '../Redux/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, message } = useSelector(state => state.appAuth);

  useEffect(() => {
    // Reset the state on component mount
    dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Login Successful!');
      navigate('/home'); 
      setFormData({
        username: "",
        password: ""
      }); 
    }

    if (isError) {
      toast.error(`Error: ${message}`);
      setFormData({
        username: "",
        password: ""
      }); 
    }
  }, [isSuccess, isError, message, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(appLogin(formData));
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#DCE8D3]">
      <div className="w-full max-w-sm">
        <form className="bg-white shadow-md rounded px-8 pb-8 mb-4" onSubmit={onSubmit}>
          <h1 className="text-center pb-5 pt-5 text-xl font-bold font-sans text-cyan-900">
            Employee Management System
          </h1>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border bg-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              onChange={onChange}
              value={formData.username} // Bind to state
              placeholder="Username"
              name="username"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow rounded w-full py-2 px-3 text-gray-700 mb-3 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              onChange={onChange}
              value={formData.password} // Bind to state
              placeholder="******************"
              required
            />
          </div>

          {isLoading ? (
            <button
              className="bg-gray-400 text-white w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled
            >
              Loading...
            </button>
          ) : (
            <button
              className="bg-cyan-800 hover:bg-black text-white tracking-wider uppercase font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          )}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
