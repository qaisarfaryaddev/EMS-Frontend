import axios from "axios";


const API_APP = "http://localhost:5000/api/v1/login";

const appLogin = async (userData) => {
    try {
        const response = await axios.post('http://localhost:5000/api/v1/login', userData);
        console.log(response.data);
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};



const authService = {
    appLogin,
    
};

export default authService;