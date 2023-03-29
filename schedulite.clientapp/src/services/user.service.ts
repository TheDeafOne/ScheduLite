import api from '../api/axios-config';
import authHeader from './auth-header';

const UserService = () => {
    function getUserBoard() {
        return api.get('/users/user', {headers: authHeader()})
    }
}

export default UserService;