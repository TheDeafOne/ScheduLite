import React, {createContext, useContext, useReducer, useState} from "react";
import ICourse from "../types/course.type";
import {stat} from "fs";
import {UserContext} from "./UserContext";

// export default
// schedule =
// user = useContext(UserProvider)
// saveScheduleToDB
//  if user
//  else {
//  NEED LOGGED IN
// setSchedule=(
type Action = {course: ICourse, type: 'add' | 'remove'}
type Dispatch = (action: Action) => void
type State = {schedule: Array<ICourse>}

export const ScheduleContext = createContext<{state: State, dispatch: Dispatch} | undefined>(undefined);

function coursesReducer(state: State, action: Action) {
    switch (action.type) {
        case "add": return {schedule: [...state.schedule, action.course]}
        case "remove": {
            const courseIndex = state.schedule.findIndex((x) => x.id === action.course.id);
            // if no match, return the previous state
            if ( courseIndex < 0) return state;
            // avoid mutating the original state, create a copy
            const stateUpdate = [...state.schedule];
            // then splice it out from the array
            stateUpdate.splice(courseIndex, 1);
            return {schedule: stateUpdate};
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}


export const ScheduleProvider = (props: any) => {
    // const empty: ICourse[] = [];
    const [activeCourses, setActiveCourses] = useReducer(coursesReducer, {schedule: []})
    const [tentativeCourses, setTentativeCourses] = useReducer(coursesReducer, {schedule: []})
    // const { userContext } = useContext(UserContext) as UserContextType;

    const value = {activeCourses, setActiveCourses, tentativeCourses, setTentativeCourses}


}

