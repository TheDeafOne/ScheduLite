import React, { useState, useEffect, useContext } from 'react';
import AuthService from '../../services/auth.service';
import VerticalTabs from './VerticalTabs';
import { useNavigate } from 'react-router-dom';
import { UserContext, UserContextType } from '../../context/UserContext';

const Profile = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext) as UserContextType;
    const [userData, setUserData] = useState<string>("");

    useEffect(() => {
        console.log(AuthService.getCurrentUser());
        if (user === null) {
            navigate("/signin");
        }
    }, [])
    return (
        <div>
            <VerticalTabs />
            <button onClick={() => {
                AuthService.logout();
                navigate("/");
            }}>
                Log Out
            </button>

        </div>
    )
}

export default Profile