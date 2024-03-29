import { useContext } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { ScheduleContext, ScheduleContextType } from "../../context/ScheduleContext";
import { UserContext, UserContextType } from '../../context/UserContext';
import AuthOptions from './AuthOptions/AuthOptions';
import './NavBar.scss';
import UserOptions from './UserOptions/UserOptions';

const NavBar = () => {
    const { user } = useContext(UserContext) as UserContextType;
    const { name } = useContext(ScheduleContext) as ScheduleContextType

    const location = useLocation();
    const navigate = useNavigate();


    return (
        <div className="navbar">
            <div className="left-side-container">
                <div className={"logo"}>
                    <span onClick={() => { navigate("/") }}>Schedulite</span>
                </div>
                {["/", "/Search"].includes(location.pathname) &&
                    <div className={"nav-bar-schedule-name"}>
                        {name !== "" ? name : "No schedule selected"}
                    </div>
                }

            </div>
            <div className="right-side-container">
                {user !== null ? <UserOptions /> : <AuthOptions />}
            </div>
        </div>
    )
}

export default NavBar;