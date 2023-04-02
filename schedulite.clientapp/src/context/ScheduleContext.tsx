import React, {createContext, useContext, useEffect, useReducer, useState} from "react";
import ICourse from "../types/course.type";
import {stat} from "fs";
import {UserContext, UserContextType} from "./UserContext";
import {bool} from "yup";
import axios from "../api/axios-config";
import {replace} from "formik";
import authHeader from "../services/auth-header";

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
    calcActiveCredits: () => number,
    saved: boolean,
    saveSchedule: () => void
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
    const [semester, setSemester] = useState("default")
    const [year, setYear] = useState("1900")
    const [name, setName] = useState("default3")
    const [saved, setSaved] = useState(true)

    const { user, scheduleExists } = useContext(UserContext) as UserContextType
    const saveSchedule = () => {
        // let schedule = {
        //
        // }
        let activeIds = activeCourses.courses.map( (value: ICourse) => {
            return {id: value.id}
        })
        let tentativeIds = activeCourses.courses.map( (value: ICourse) => {
            return {id: value.id}
        })
        let schedule = {
            scheduleName: name,
            semester: semester,
            year: year,
            tentativeCourses: tentativeIds,
            activeCourses: activeIds
        }
        let request = scheduleExists(name) ? "/users/update-schedule" : "/users/add-schedule";
        console.log(request);
        axios
            .post( request, JSON.stringify(schedule),{headers: authHeader()})
            .then(response => {
                console.log(response);
                setSaved(true)
            });
    }
    const calcActiveCredits = () : number => {
        let credits : number = 0
        activeCourses.courses.forEach(function(elem : ICourse, index : number) {
            credits += +elem.credit_hours;
        });
        return credits
    }
    useEffect(() => {
        setSaved(false);
        // console.log(saved);
    }, [activeCourses, tentativeCourses])
    // const [saved]
    const value = {activeCourses, setActiveCourses, tentativeCourses, setTentativeCourses, calcActiveCredits, saved, saveSchedule}
    return (
        <ScheduleContext.Provider value={value}>
            {props.children}
        </ScheduleContext.Provider>
    )

}

