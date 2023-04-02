import React, { useState, useEffect } from 'react';
import authService from '../../services/auth.service';
import VerticalTabs from './VerticalTabs';

const Profile = () => {
    const [userData, setUserData] = useState<string>("");
    useEffect(() => {
        console.log(authService.getCurrentUser());
    },[])
    return (
        <div>
            <VerticalTabs />
        </div>
    )
}

export default Profile