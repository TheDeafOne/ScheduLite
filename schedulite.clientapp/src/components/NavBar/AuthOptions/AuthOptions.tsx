import { useNavigate } from "react-router-dom";
import './AuthOptions.scss';
import SearchIcon from '../../../resources/icons/search-icon.svg';

const AuthOptions = () => {
    const navigate = useNavigate();

    return (
        <div className="auth-options-container">
            <img
                alt=""
                className="search-icon"
                src={SearchIcon}
                onClick={() => navigate("/Search", {replace: true})}
            />
            <button className="auth-button signup" onClick={() => { navigate("/signup") }}>
                Sign Up
            </button>
            <button className="auth-button login" onClick={() => { navigate("/login") }}>
                Log In
            </button>
        </div>
    )
}

export default AuthOptions