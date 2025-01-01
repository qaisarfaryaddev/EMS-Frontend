import React from 'react';
import AddEmployeDialog from './AddEmployeDialog';

const EmployeListing = () => {
  return (
    <div className='p-2 rounded-lg'>
      <div className='pl-8'>
        <AddEmployeDialog /> {/* Add dialog component here */}
      </div>
    </div>
  );
};

export default EmployeListing;
