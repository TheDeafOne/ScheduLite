import React from 'react';
import { useNavigate } from "react-router-dom";
import './AuthOptions.scss';

const AuthOptions = () => {
    const navigate = useNavigate();

    return (
        <div className="auth-options-container">
            <button className="auth-button signup" onClick={() => { navigate("/signup") }}>
                Sign Up
            </button>
            <button className="auth-button login" onClick={() => { navigate("/signin") }}>
                Log In
            </button>
        </div>
    )
}

export default AuthOptions