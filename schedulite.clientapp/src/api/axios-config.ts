import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://schedulite-webservice-z3amrpaz5q-uc.a.run.app/api/v1',
    headers: { "ngrok-skip-browser-warning": "false" }
})
instance.interceptors.request.use(request => {
    return request;
}, error => {
    return Promise.reject(error);
});
export default instance;