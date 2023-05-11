import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import VerticalTabs from './VerticalTabs';
import { UserContext, UserContextType } from '../../context/UserContext';


const Profile = () => {
    const { user, setUser } = useContext(UserContext) as UserContextType;

    const navigate = useNavigate();

    useEffect(() => {
        if (AuthService.getCurrentUser() === null) {
            navigate("/login", { replace: true });
        }
    }, [])
    return (
        <div>
            <VerticalTabs />
            <button onClick={() => {
                setUser(null);
                console.log('users',user);
                // AuthService.logout();

                navigate("/login");
            }}>
                Log Outttt
            </button>
        </div>
    )
}

export default Profile