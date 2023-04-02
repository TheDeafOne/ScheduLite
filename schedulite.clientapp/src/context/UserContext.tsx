import React, {createContext, useContext, useReducer, useState} from "react";
import IUser from "../types/user.type";


export interface UserContextType {
    user: IUser | null,
    setUser: (user: IUser) => void
}
export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = (props : any) => {


    const [user, setUser] = useState<IUser | null>(null)

    return (
        <UserContext.Provider
            value={{user, setUser}}>
            {props.children}
        </UserContext.Provider>
    )
}
