import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import EmployeStats from "../Components/EmployeStats";
import EmployeListing from "../Components/EmployeListing";
import { columns } from "../Components/Data-Table/columns";
import { DataTable } from "../Components/Data-Table/data-table";
import { getEmployees, reset } from "../Redux/Employe/getEmployeSlice"; // Adjust the path as needed

const Home = () => {
  const dispatch = useDispatch();
  const { employees, isLoading, isError, message } = useSelector((state) => state.getEmployees);

  // Preprocess employees to add a serial number
  const employeesWithSr = employees.map((employee, index) => ({
    ...employee,
    sr: index + 1, 
  }));

  useEffect(() => {
    dispatch(getEmployees());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {message}</p>;
  }

  return (
    <div>
      <Navbar />
      <EmployeStats />
      <div className="container mx-auto py-5 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg overflow-hidden">
          <EmployeListing />
          {/* Pass employeesWithSr to DataTable */}
          <DataTable columns={columns} data={employeesWithSr} />
        </div>
      </div>
    </div>
  );
};

export default Home;