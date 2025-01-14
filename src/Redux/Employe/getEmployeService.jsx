import axiosApi from '../../Axios/axios';

const getEmployees = async () => {
    try {
        const response = await axiosApi.get('/api/v1/getEmploye');

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