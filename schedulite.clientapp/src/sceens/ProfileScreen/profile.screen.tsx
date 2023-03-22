import React, { useState, useEffect } from 'react';
import authService from '../../services/auth.service';

const Profile = () => {
    const [userData, setUserData] = useState<string>("");
    useEffect(() => {
        console.log(authService.getCurrentUser());
    },[])
    return (
        <div>
            hello
        </div>
    )
}

export default Profile