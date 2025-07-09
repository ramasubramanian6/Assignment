import axios from 'axios';
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'; // Default to localhost if not set

const axiosInstance = axios.create({
  baseURL: baseURL,
  
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
});

export default axiosInstance;