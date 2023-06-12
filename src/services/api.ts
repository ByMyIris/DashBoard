import axios from 'axios';

const api = axios.create({
    baseURL: 'dpg-ci2vjbak728i8tbvtsmg-a.oregon-postgres.render.com',
});

export default api;