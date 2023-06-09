import axios from "axios";

const axiosInstance =  axios.create({
    baseURL: 'http://localhost:8042/',
    timeout: 10000
})

axiosInstance.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem("user"));
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });
  
export default axiosInstance;