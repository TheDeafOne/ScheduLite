import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import VerticalTabs from './VerticalTabs';

const Profile = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (AuthService.getCurrentUser() === null) {
            navigate("/login", { replace: true });
        }
    // eslint-disable-line
    }, [])
    return (
        <div>
            <VerticalTabs />
            <button onClick={() => {
                AuthService.logout();
                navigate("/login");
            }}>
                Log Out
            </button>

        </div>
    )
}

export default Profile