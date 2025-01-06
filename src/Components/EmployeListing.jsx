import React from 'react';
import AddEmployeDialog from './AddEmployeDialog';

const EmployeListing = () => {
  return (
    <div className='p-2 rounded-lg'>
      <div>
        <AddEmployeDialog /> {/* Add dialog component here */}
      </div>
    </div>
  );
};

export default EmployeListing;
