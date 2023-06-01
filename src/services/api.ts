import axios from 'axios';

const api = axios.create({
    baseURL: 'https://json-server-dashboard-casz.onrender.com',
});

export default api;