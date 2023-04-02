import React, { useEffect, useState } from 'react';
import UserOptions from '../UserOptions/UserOptions';
import AuthOptions from '../AuthOptions/AuthOptions';
import './NavBar.scss';

const NavBar = ({loggedIn}: {loggedIn: boolean}) => {
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