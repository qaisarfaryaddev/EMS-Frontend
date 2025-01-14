import axiosApi from '../../Axios/axios';


const addEmploye = async (employeData) => {
    try {
        const response = await axiosApi.post('/api/v1/addEmploye', employeData);

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