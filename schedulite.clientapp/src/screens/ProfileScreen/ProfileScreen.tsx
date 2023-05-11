import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext, UserContextType } from '../../context/UserContext';
import AuthService from '../../services/auth.service';
import VerticalTabs from './VerticalTabs';

import { Button } from "@mui/material";

const Profile = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext) as UserContextType;
    useEffect(() => {
        if (AuthService.getCurrentUser() === null) {
            navigate("/login", { replace: true });
        }
        // eslint-disable-next-line
    }, [])
    return (
        <div className="profile-flex-container">
            <div className={"profile-layout"}>
                <VerticalTabs />
                <Button
                    sx={{
                        margin: 1,
                        border: "1px solid rgba(255, 255, 255, 0.39)"
                    }}
                    className={"log-out"}
                    onClick={() => {
                        setUser(null);
                        AuthService.logout();

                    }}>
                    <a href="/login" style={{all: "unset"}}>
                        Log Out
                    </a>
                </Button>

            </div>

        </div>
    );
}

export default Profile