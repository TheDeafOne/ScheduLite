import React, {createContext, useContext, useReducer, useState} from "react";
import IUser from "../types/user.type";
import ICourse from "../types/course.type";
import ISchedule from "../types/schedule.type";


export interface UserContextType {
    user: IUser | null,
    setUser: (user: IUser) => void,
    scheduleExists: (name: string) => boolean | undefined | null,
    addUserSchedule: (schedule: ISchedule) => void
    updateUserSchedule: (schedule: ISchedule) => void
}
export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = (props : any) => {


    const [user, setUser] = useState<IUser | null>(null)
    const scheduleExists = (name: string) => {
        return user && user.schedules && user.schedules.some((e : ISchedule) => e.scheduleName === name)
    }
    const addUserSchedule = (schedule: ISchedule) => {
        if (user) {
            let tempUser = user
            tempUser.schedules = tempUser.schedules ? [...tempUser.schedules, schedule] : [schedule]
            setUser(tempUser)
        }
    }
    const updateUserSchedule = (schedule: ISchedule) => {
        if (user) {
            let tempUser = user
            if (tempUser.schedules) {
                let idx = tempUser.schedules.findIndex((x) => x.scheduleName === schedule.scheduleName);
                tempUser.schedules[idx] = schedule
            }
        }
    }
    return (
        <UserContext.Provider
            value={{user, setUser, scheduleExists, addUserSchedule, updateUserSchedule}}>
            {props.children}
        </UserContext.Provider>
    )
}
