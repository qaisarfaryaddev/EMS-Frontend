import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/components/ui/dialog";
import { Button } from "@/Components/components/ui/button";
import { Input } from "@/Components/components/ui/input";  // ShadCN Input
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/components/ui/select";  // ShadCN Select components

const AddEmployeeDialog = () => {
  const [open, setOpen] = useState(false);  // Controls dialog visibility
  const [employeeData, setEmployeeData] = useState({
    name: '',
    designation: '',
    batch: '',  // New field for batch
    cellNo: '',
    currentPosting: '',
  });

  // Reset form data
  const resetFormData = () => {
    setEmployeeData({
      name: '',
      designation: '',
      batch: '',
      cellNo: '',
      currentPosting: '',
    });
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
    console.log('Employee Data:', employeeData);
    setOpen(false);  // Close the dialog after submitting
    resetFormData(); // Reset the form data after submit
  };

  // Handle dialog close (without submission)
  const handleDialogClose = () => {
    setOpen(false);  // Close the dialog
    resetFormData(); // Reset the form data when dialog is closed without submit
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        handleDialogClose();
      } else {
        setOpen(true);
      }
    }}>
      <DialogTrigger asChild>
        <Button>
          Add Employee
        </Button>
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
          <DialogDescription>
            Please enter the employee details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block">Name</label>
            <Input
              type="text"
              id="name"
              name="name"
              value={employeeData.name}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          {/* Designation Field - Using ShadCN Select */}
          <div>
            <label htmlFor="designation" className="block">Designation</label>
            <Select value={employeeData.designation} onValueChange={(value) => setEmployeeData({ ...employeeData, designation: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Designation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Developer">Developer</SelectItem>
                <SelectItem value="Tester">Tester</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Batch Dropdown - Using ShadCN Select */}
          <div>
            <label htmlFor="batch" className="block">Batch</label>
            <Select value={employeeData.batch} onValueChange={(value) => setEmployeeData({ ...employeeData, batch: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Batch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Batch 1">Batch 1</SelectItem>
                <SelectItem value="Batch 2">Batch 2</SelectItem>
                <SelectItem value="Batch 3">Batch 3</SelectItem>
                <SelectItem value="Batch 4">Batch 4</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cell No. Field */}
          <div>
            <label htmlFor="cellNo" className="block">Cell No.</label>
            <Input
              type="text"
              id="cellNo"
              name="cellNo"
              value={employeeData.cellNo}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          {/* Current Posting Field */}
          <div>
            <label htmlFor="currentPosting" className="block">Current Posting</label>
            <Input
              type="text"
              id="currentPosting"
              name="currentPosting"
              value={employeeData.currentPosting}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeDialog;
