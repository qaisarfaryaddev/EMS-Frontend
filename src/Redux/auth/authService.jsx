import axiosApi from '../../Axios/axios';



const appLogin = async (userData) => {
    try {
        const response = await axiosApi.post('/api/v1/login', userData);

        if (response.data) {

            return response.data;
        }
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};


const Logout = async () => {
    try {
        const response = await axiosApi.get('/api/v1/logout');
        if (response.data) {
            return response.data;
        }
       
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
};

const authService = {
    appLogin,
    Logout,
};

export default authService;
