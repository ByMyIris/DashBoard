import axios from 'axios';

const api = axios.create({
    baseURL: 'https://sistema-pessoal-api.onrender.com/api',
});

export default api;