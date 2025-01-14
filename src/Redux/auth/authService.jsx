import axiosApi from '../../Axios/axios';



const appLogin = async (userData) => {
    try {
        const response = await axiosApi.post('/api/v1/login', userData);

        if (response.data) {
            console.log("Login response:", response.data);

            const token = response.data.token;
            console.log("token", token)
            if (token) {
                localStorage.setItem("authToken", token);
            } else {
                console.warn("Token not found in the response");
            }

            return response.data;
        }
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};



const Logout_Api = "http://localhost:5000/api/v1/logout";

// Update the appLogin function to include `withCredentials: true`
const Logout = async () => {
    try {
        const response = await axios.get(Logout_Api,{
            withCredentials:true
        });
        if (response.data) {
            return response.data;
        }
        ;

       
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
