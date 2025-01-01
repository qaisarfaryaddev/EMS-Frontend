import React from "react";

const Statistics = () => {
  return (
    <div className="bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto grid gap-4 sm:grid-cols-3">
        {/* Total */}
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-bold text-gray-700">TOTAL</h2>
          <p className="text-3xl font-semibold text-red-700 mt-2">120</p>
        </div>

        {/* SSA */}
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-bold text-gray-700">SSA</h2>
          <p className="text-3xl font-semibold text-green-700 mt-2">45</p>
        </div>

        {/* PSA */}
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-bold text-gray-700">PSA</h2>
          <p className="text-3xl font-semibold text-cyan-700 mt-2">75</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
