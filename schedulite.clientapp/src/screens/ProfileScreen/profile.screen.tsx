import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import IUser from "../../types/user.type";

interface UserTokenData {
    accessToken: string;
    currentUser?: IUser;
}
const Profile = () => {
    const [userReady, setUserReady] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<UserTokenData>({accessToken: ""})

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) {
            const navigate = useNavigate();
            navigate("/home");
        }
        currentUser.setState({currentUser: currentUser, userReady: true});
    }, [])

    return (
        <div>
            {(userReady) ?
                <div>
                    <header>
                        <h3>
                            <strong>{currentUser.currentUser!.username}</strong>
                        </h3>
                    </header>
                    <p>
                        <strong>Token:</strong>{" "}
                        {currentUser.accessToken.substring(0,20)} ...  {" "}
                        {currentUser.accessToken.substring(currentUser.accessToken.length-20)}
                    </p>
                    <p>
                    <strong>Id:</strong>{" "}
                    {currentUser.currentUser!.id}
                    </p>
                    <p>
                    <strong>Email:</strong>{" "}
                    {currentUser.currentUser!.email}
                    </p>
                    <strong>Authorities:</strong>
                    <ul>
                    {currentUser.currentUser!.roles &&
                        currentUser.currentUser!.roles.map((role, index) => <li key={index}>{role}</li>)}
                    </ul>
                </div>
            : null}
        </div>
    )
}

export default Profile