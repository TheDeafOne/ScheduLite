import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import VerticalTabs from './VerticalTabs';
import { UserContext, UserContextType } from '../../context/UserContext';


const Profile = () => {
    const { setUser } = useContext(UserContext) as UserContextType;

    const navigate = useNavigate();

    useEffect(() => {
        if (AuthService.getCurrentUser() === null) {
            navigate("/login", { replace: true });
        }
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <VerticalTabs />
            <button onClick={() => {
                setUser(null);
                AuthService.logout();
                navigate("/login");
            }}>
                Log Out
            </button>

        </div>
    )
}

export default Profile