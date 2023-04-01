import React, { useEffect, useState } from 'react';
import './navbar.css';

const NavBar = ({loggedIn}: {loggedIn: boolean}) => {
    // const [loggedIn]
    // useEffect(() => {
    //     if (loggedIn) {

    //     }
    // },[])

    return (
        <div className="navbar">
            <div className="navbar-content-container">
                <div>
                    name
                </div>
                <div>
                    logo
                </div>
            </div>
        </div>
    )
}

export default NavBar;