import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import VerticalTabs from './VerticalTabs';
import { UserContext, UserContextType } from '../../context/UserContext';
import { Button } from "@mui/material";

const Profile = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (AuthService.getCurrentUser() === null) {
            navigate("/login", { replace: true });
        }
    }, [])
    return (
        <div className="profile-flex-container">
            <div className={"profile-layout"}>
                <VerticalTabs/>
                <Button
                    sx={{
                        margin: 1,
                        border: "1px solid rgba(255, 255, 255, 0.39)"
                    }}
                    className={"log-out"}
                    onClick={() => {
                    AuthService.logout();
                    navigate("/login");
                }}>
                    Log Out
                </Button>

            </div>

        </div>
    );
}

export default Profile