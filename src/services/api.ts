import axios from 'axios';

const api = axios.create({
    baseURL: 'https://json-server-dashboard.onrender.com',
});

export default api;