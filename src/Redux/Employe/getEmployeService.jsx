import axios from "axios";

const API_APP = "http://localhost:5000/api/v1/getEmploye";

const getEmployees = async () => {
    try {
        const response = await axios.get(API_APP, {
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
    getEmployees
}

export default employeeService;