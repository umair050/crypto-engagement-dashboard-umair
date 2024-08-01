
import axios from 'axios';



const axiosInstance = axios.create({
  baseURL: "http://buzz-back-2:8080", 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',

  },
});



export default axiosInstance;
