import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    headers: { "ngrok-skip-browser-warning": "false" }
})
instance.interceptors.request.use(request => {
    return request;
}, error => {
    return Promise.reject(error);
});
export default instance;