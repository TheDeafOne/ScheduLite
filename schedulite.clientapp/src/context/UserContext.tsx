import React, {createContext, useContext, useReducer, useState} from "react";
import IUser from "../types/user.type";
import ICourse from "../types/course.type";
import ISchedule from "../types/schedule.type";


export interface UserContextType {
    user: IUser | null,
    setUser: (user: IUser) => void,
    scheduleExists: (name: string) => boolean | undefined | null
}
export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = (props : any) => {


    const [user, setUser] = useState<IUser | null>(null)
    const scheduleExists = (name: string) => {
        return user && user.schedules && user.schedules.some((e : ISchedule) => e.scheduleName === name)
    }
    return (
        <UserContext.Provider
            value={{user, setUser, scheduleExists}}>
            {props.children}
        </UserContext.Provider>
    )
}
