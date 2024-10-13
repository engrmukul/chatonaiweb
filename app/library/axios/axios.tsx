// app/axiosConfig.js
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL
// Use the environment variable for the base URL
axios.defaults.baseURL = apiUrl


export default axios;
