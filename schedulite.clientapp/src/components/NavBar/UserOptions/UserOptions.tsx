import React from 'react';
import { useNavigate } from "react-router-dom";
import DefaultProfileIcon from '../../../resources/icons/default-profile-icon.png';
import UserScheduleSelectionIcon from '../../../resources/icons/schedule-selection-icon.svg';
import AppsIcon from '@mui/icons-material/Apps';
import SvgIcon from '@mui/material/SvgIcon';

import './UserOptions.scss';
import {Aod} from "@mui/icons-material";

const UserOptions = () => {
    const navigate = useNavigate();
    return (
        <div className="user-options-container">
            <img
                className="schedule-selection-icon"
                src={UserScheduleSelectionIcon}
                onClick={() => {navigate("/schedule-selection",{replace:true})}}
            />
            <img 
                className="profile-icon" 
                src={DefaultProfileIcon} 
                onClick={() => {navigate("/profile",{replace:true})}} 
            />
        </div>
    )
}

export default UserOptions