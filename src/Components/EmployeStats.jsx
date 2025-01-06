import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees, reset } from "../Redux/Employe/getEmployeSlice";

const Statistics = () => {
  const dispatch = useDispatch();

  const { designationCounts, totalEmployees, isLoading, isError, message } = useSelector(
    (state) => state.getEmployees
  );

  // useEffect(() => {
  //   // Dispatch the action to fetch employees
  //   dispatch(getEmployees());

  //   // Cleanup action to reset the state when the component unmounts
  //   return () => {
  //     dispatch(reset());
  //   };
  // }, [dispatch]); // Only run this effect when `dispatch` changes (usually doesn't change)

  if (isLoading) return <p>Loading statistics...</p>;
  if (isError) return <p>Error: {message}</p>;

  return (
    <div className=" p-4">
      <div className="max-w-7xl mx-auto grid gap-4 sm:grid-cols-3">
        {/* Total */}
        <div className="bg-[#222831] p-6 rounded shadow text-center">
          <h2 className="text-xl font-bold text-white tracking-widest font-serif">TOTAL</h2>
          <p className="text-3xl font-semibold text-white mt-2">{totalEmployees}</p>
        </div>

        {/* SSA */} 
        <div className="bg-[#186F65] p-6 rounded shadow text-center">
          <h2 className="text-xl font-bold text-white tracking-widest font-serif">SSA</h2>
          <p className="text-3xl font-semibold text-white mt-2">{designationCounts.SSA}</p>
        </div>

        {/* PSA */}
        <div className="bg-[#26577C] p-6 rounded shadow text-center">
          <h2 className="text-xl font-bold text-white tracking-widest font-serif">PSA</h2>
          <p className="text-3xl font-semibold text-white mt-2">{designationCounts.PSA}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
