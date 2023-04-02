import React, {createContext, useContext, useReducer, useState} from "react";
import {number} from "yup";

// type State = {}
interface User {
    username: string
}
interface UserContextType {
    user: User,
    setUser: (user: User) => void
}
export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = (props : any) => {
    const [user, setUser] = useState<User>({
        username: ""
    })
    // other stuff here
    // const value = {user, setUser}
    return (
        <UserContext.Provider
            value={{user, setUser}}>
            {props.children}
        </UserContext.Provider>
        )
}
