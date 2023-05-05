import React, { useState, useEffect, useContext } from 'react';
import AuthService from '../../services/auth.service';
import VerticalTabs from './VerticalTabs';
import { useNavigate } from 'react-router-dom';
import { UserContext, UserContextType } from '../../context/UserContext';

const Profile = () => {
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
                AuthService.logout();
                navigate("/login");
            }}>
                Log Out
            </button>

        </div>
    )
}

export default Profile