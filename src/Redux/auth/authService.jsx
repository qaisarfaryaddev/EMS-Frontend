import axios from "axios";

const API_APP = "http://localhost:5000/api/v1/login";

// Update the appLogin function to include `withCredentials: true`
const appLogin = async (userData) => {
    try {
        const response = await axios.post(API_APP, userData, {
            withCredentials: true, // Ensures cookies are sent and received
        });

        if (response.data) {
            console.log("Login response:", response.data);

            // Extract the token from the cookie if sent as a cookie by the backend
            const token = response.data.token;
            console.log("token", token)
            // Store the token in local storage
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

const authService = {
    appLogin,
};

export default authService;
