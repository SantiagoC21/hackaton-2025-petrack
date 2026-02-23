import axios from "axios";

const API_CLIENT = axios.create({


    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,

    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    withCredentials: true
});


API_CLIENT.interceptors.response.use(
    (response) => {

        return response;
    },
    async (error) => {

        if (error.response && error.response.status === 401) {
            if (typeof window !== "undefined") {
                
                if (window.location.pathname !== "/") {
                    window.location.href = "/";
                }
                
            }
            
                
        }

        return Promise.reject(error);
    }


    
);

export default API_CLIENT;