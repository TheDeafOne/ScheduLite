import { useNavigate } from "react-router-dom";
import DefaultProfileIcon from '../../../resources/icons/default-profile-icon.png';
import UserScheduleSelectionIcon from '../../../resources/icons/schedule-selection-icon.svg';
import SearchIcon from '../../../resources/icons/search-icon.svg';

import './UserOptions.scss';

const UserOptions = () => {
    const navigate = useNavigate();
    return (
        <div className="user-options-container">
            <img
                alt=""
                className="schedule-selection-icon"
                src={UserScheduleSelectionIcon}
                onClick={() => { navigate("/schedule-selection", { replace: true }) }}
            />
            <img
                alt=""
                className="profile-icon"
                src={DefaultProfileIcon}
                onClick={() => { navigate("/profile", { replace: true }) }}
            />
            <img
                alt=""
                className="search-icon"
                src={SearchIcon}
                onClick={() => navigate("/Search", {replace: true})}
            />
        </div>
    )
}

export default UserOptions