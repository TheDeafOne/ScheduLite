import React, { useEffect, useState, useContext } from 'react';
import UserOptions from '../UserOptions/UserOptions';
import AuthOptions from '../AuthOptions/AuthOptions';
import { UserContext, UserContextType } from '../../context/UserContext';
import './NavBar.scss';
import {ScheduleContext, ScheduleContextType} from "../../context/ScheduleContext";
import {useLocation} from "react-router-dom";

const NavBar = () => {
    const { user } = useContext(UserContext) as UserContextType;
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const { name } = useContext(ScheduleContext) as ScheduleContextType

    const location = useLocation()
    console.log(location)
    useEffect(() => {
        console.log(user);
        if (user !== null) {
            setLoggedIn(true);
        }
    },[user])

    return (
        <div className="navbar">
            <div className="left-side-container">
                <div className={"logo"}>
                    ScheduLite
                </div>
                {["/", "/Search"].includes(location.pathname) &&
                    <div className={"nav-bar-schedule-name"}>
                        {name != "" ? name : "No name for schedule"}
                    </div>
                }

            </div>
            <div className="right-side-container">
                {loggedIn ? <UserOptions /> : <AuthOptions />}
            </div>
        </div>
    )
}

export default NavBar;