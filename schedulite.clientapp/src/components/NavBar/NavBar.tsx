import React, { useEffect, useState, useContext } from 'react';
import UserOptions from '../UserOptions/UserOptions';
import AuthOptions from '../AuthOptions/AuthOptions';
import { UserContext, UserContextType } from '../../context/UserContext';
import './NavBar.scss';

const NavBar = () => {
    const { user } = useContext(UserContext) as UserContextType;
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        console.log(user);
        if (user !== null) {
            setLoggedIn(true);
        }
    },[])

    return (
        <div className="navbar">
            <div className="left-side-container">
                ScheduLite
            </div>
            <div className="right-side-container">
                {loggedIn ? <UserOptions /> : <AuthOptions />}
            </div>
        </div>
    )
}

export default NavBar;