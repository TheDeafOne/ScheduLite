import React, { useEffect, useState, useContext } from 'react';
import UserOptions from './UserOptions/UserOptions';
import AuthOptions from './AuthOptions/AuthOptions';
import { UserContext, UserContextType } from '../../context/UserContext';
import './NavBar.scss';
import { ScheduleContext, ScheduleContextType } from "../../context/ScheduleContext";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

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
                        {name != "" ? name : "No name for schedule"}
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