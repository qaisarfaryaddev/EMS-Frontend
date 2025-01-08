import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/components/ui/dialog";
import { Button } from "@/Components/components/ui/button";
import { Input } from "@/Components/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/components/ui/select"; // ShadCN Select components
import { useDispatch, useSelector } from "react-redux";
import { addEmployee, reset } from "../Redux/Employe/addEmployeSlice";
import { toast, ToastContainer } from 'react-toastify'; 
import { policeStation } from "../utils/constants";

// Import Toastify styles
import 'react-toastify/dist/ReactToastify.css';

const AddEmployeeDialog = () => {
  const [open, setOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    employeName: "",
    designation: "",
    batch: "",
    phoneNumber: "",
    posting: "",
    shift:""
  });

  const [errors, setErrors] = useState({
    designation: false,
    batch: false,
  });

  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.employee
  );

  // Reset form data
  const resetFormData = () => {
    setEmployeeData({
      employeName: "",
      designation: "",
      batch: "",
      phoneNumber: "",
      posting: "",
      shift:""
    });
    setErrors({ designation: false, batch: false });
    dispatch(reset());
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { designation, batch,shift } = employeeData;

    // Validate select fields
    const hasErrors = {
      designation: !designation,
      batch: !batch,
      shift:!shift
    };

    setErrors(hasErrors);

    if (hasErrors.designation || hasErrors.batch || hasErrors.shift) {
      return;
    }

    // Dispatch addEmployee action
    try {
      await dispatch(addEmployee(employeeData));
      console.log("Submitting Employee Data:", employeeData);
      setOpen(false); // Close dialog on success
      resetFormData(); // Reset form
      toast.success("Employee added successfully!"); // Show success message using Toastify
    } catch (error) {
      console.error("Error adding employee:", error);
      toast.error("Failed to add employee!"); // Show error message using Toastify
    }
  };

  
  const handleDialogClose = () => {
    setOpen(false);
    resetFormData(); 
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            handleDialogClose();
          } else {
            setOpen(true);
          }
        }}
      >
        <DialogTrigger asChild>
          <Button disabled={isLoading}>Add Employee</Button>
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
              <label htmlFor="employeName" className="block">
                Employee Name
              </label>
              <Input
                type="text"
                id="employeName"
                name="employeName"
                value={employeeData.employeName}
                onChange={handleInputChange}
                className="w-full"
                required
              />
            </div>

            {/* Designation Field */}
            <div>
              <label htmlFor="designation" className="block">
                Designation
              </label>
              <Select
                value={employeeData.designation}
                onValueChange={(value) =>
                  setEmployeeData({ ...employeeData, designation: value })
                }
              >
                <SelectTrigger
                  className={`w-full ${errors.designation ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select Designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SSA">SSA</SelectItem>
                  <SelectItem value="PSA">PSA</SelectItem>
                </SelectContent>
              </Select>
              {errors.designation && (
                <p className="text-red-500 text-sm">Designation is required.</p>
              )}
            </div>

            {/* Batch Dropdown */}
            <div>
              <label htmlFor="batch" className="block">
                Batch
              </label>
              <Select
                value={employeeData.batch}
                onValueChange={(value) =>
                  setEmployeeData({ ...employeeData, batch: value })
                }
              >
                <SelectTrigger
                  className={`w-full ${errors.batch ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select Batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st">1st</SelectItem>
                  <SelectItem value="2nd">2nd</SelectItem>
                  <SelectItem value="3rd">3rd</SelectItem>
                  <SelectItem value="4th">4th</SelectItem>
                  <SelectItem value="5th">5th</SelectItem>
                  <SelectItem value="6th">6th</SelectItem>
                  <SelectItem value="7th">7th</SelectItem>
                  <SelectItem value="8th">8th</SelectItem>
                </SelectContent>
              </Select>
              {errors.batch && (
                <p className="text-red-500 text-sm">Batch is required.</p>
              )}
            </div>

            {/* Cell No. Field */}
            <div>
              <label htmlFor="phoneNumber" className="block">
                Phone Number
              </label>
              <Input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={employeeData.phoneNumber}
                onChange={handleInputChange}
                className="w-full"
                required
              />
            </div>

            {/* Current Posting Field */}
            <div>
              <label htmlFor="posting" className="block">
                Police Station
              </label>
              <Select
                value={employeeData.posting}
                onValueChange={(value) =>
                  setEmployeeData({ ...employeeData, posting: value })
                }
              >
                <SelectTrigger
                  className={`w-full ${errors.posting ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select Police Station" />
                </SelectTrigger>
                <SelectContent>
                  {policeStation.map((station, index) => (
                    <SelectItem key={index} value={station}>
                      {station}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.posting && (
                <p className="text-red-500 text-sm">Police Station is required.</p>
              )}
            </div>
                {/* shift */}
            <div>
              <label htmlFor="shift" className="block">
                Duty Shift
              </label>
              <Select
                value={employeeData.shift}
                onValueChange={(value) =>
                  setEmployeeData({ ...employeeData, shift: value })
                }
              >
                <SelectTrigger
                  className={`w-full ${errors.shift ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select Duty Shift" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Morning">Morning</SelectItem>
                  <SelectItem value="Evening">Evening</SelectItem>
                  <SelectItem value="Night">Night</SelectItem>
                </SelectContent>
              </Select>
              {errors.shift && (
                <p className="text-red-500 text-sm">Duty Shift is required.</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>

          {isError && <p className="text-red-500 mt-4">{message}</p>}
          {isSuccess && (
            <p className="text-green-500 mt-4">Employee added successfully!</p>
          )}
        </DialogContent>
      </Dialog>

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
};

export default AddEmployeeDialog;
