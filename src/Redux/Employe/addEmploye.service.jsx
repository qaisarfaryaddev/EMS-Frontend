import axios from "axios";

const API_APP = "http://localhost:5000/api/v1/addEmploye";

const addEmploye = async (employeData) => {
    try {
        const response = await axios.post(API_APP, employeData, {
            withCredentials: true, 
        });

        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error("Error adding employe in:", error);
        throw error;
    }
};

const employeeService = {
addEmploye
}

export default employeeService;