import React, {createContext, useContext, useReducer, useState} from "react";
import ICourse from "../types/course.type";
import {stat} from "fs";
import {UserContext} from "./UserContext";
import {bool} from "yup";

// export default
// schedule =
// user = useContext(UserProvider)
// saveScheduleToDB
//  if user
//  else {
//  NEED LOGGED IN
// setSchedule=(
type Action = {course: ICourse, type: 'add' | 'remove', unshift?: boolean | null}
type Dispatch = (action: Action) => void
type State = {courses: Array<ICourse>}

export interface ScheduleContextType {
    activeCourses: State,
    setActiveCourses: Dispatch,
    tentativeCourses: State,
    setTentativeCourses: Dispatch,
    calcActiveCredits: () => number
}
export const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

function coursesReducer(state: State, action: Action) {
    switch (action.type) {
        case "add": {
            return {
                courses: action.unshift ? [action.course, ...state.courses] : [...state.courses, action.course]
            }
        }
        case "remove": {
            const courseIndex = state.courses.findIndex((x) => x.id === action.course.id);
            // if no match, return the previous state
            if ( courseIndex < 0) return state;
            // avoid mutating the original state, create a copy
            const stateUpdate = [...state.courses];
            // then splice it out from the array
            stateUpdate.splice(courseIndex, 1);
            return {courses: stateUpdate};
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}


export const ScheduleProvider = (props: any) => {
    // const empty: ICourse[] = [];
    const [activeCourses, setActiveCourses] = useReducer(coursesReducer, {courses: []})
    const [tentativeCourses, setTentativeCourses] = useReducer(coursesReducer, {courses: []})
    const calcActiveCredits = () : number => {
        let credits : number = 0
        activeCourses.courses.forEach(function(elem : ICourse, index : number) {
            credits += +elem.credit_hours;
        });
        return credits
    }
    const value = {activeCourses, setActiveCourses, tentativeCourses, setTentativeCourses, calcActiveCredits}
    return (
        <ScheduleContext.Provider value={value}>
            {props.children}
        </ScheduleContext.Provider>
    )

}

