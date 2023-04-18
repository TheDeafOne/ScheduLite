import React, {createContext, useContext, useEffect, useReducer, useState} from "react";
import ICourse from "../types/course.type";
import {stat} from "fs";
import {UserContext, UserContextType} from "./UserContext";
import {bool, boolean} from "yup";
import axios from "../api/axios-config";
import {replace} from "formik";
import authHeader from "../services/auth-header";
import ISchedule from "../types/schedule.type";
import { IconBaseProps } from "react-icons/lib";
import moment from "moment";

// export default
// schedule =
// user = useContext(UserProvider)
// saveScheduleToDB
//  if user
//  else {
//  NEED LOGGED IN
// setSchedule=(
type Action = {course: ICourse | null, type: 'add' | 'remove' | 'setAll', unshift?: boolean | null, courseList?: ICourse[] | null}

type Dispatch = (action: Action) => void
type State = {courses: Array<ICourse>}

export interface ScheduleContextType {
    activeCourses: State,
    setActiveCourses: Dispatch,
    tentativeCourses: State,
    setTentativeCourses: Dispatch,
    calcActiveCredits: () => number,
    inSchedule: (course: ICourse) => boolean,
    overlap: (course1: ICourse, course2: ICourse) => boolean,
    saved: boolean,
    year: string,
    setYear: React.Dispatch<React.SetStateAction<string>>,
    name: string,
    setName: React.Dispatch<React.SetStateAction<string>>,
    semester: string,
    setSemester: React.Dispatch<React.SetStateAction<string>>,
    saveSchedule: () => void
}
export const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

function coursesReducer(state: State, action: Action) {
    switch (action.type) {
        case "add": {
            if (action.course) {
                return {
                    courses: action.unshift ? [action.course, ...state.courses] : [...state.courses, action.course]
                }
            } else return {courses: state.courses}
            // return {
            //     courses: action.unshift ? [action.course, ...state.courses] : [...state.courses, action.course]
            // }
        }
        case "remove": {
            let courseIndex = -1
            console.log("REMOVE")
            if (action.course) {
                courseIndex = state.courses.findIndex((x) => x.id === action.course!.id);
            } 
            // if no match, return the previous state
            if ( courseIndex < 0) return state;
            // avoid mutating the original state, create a copy
            const stateUpdate = [...state.courses];
            // then splice it out from the array
            stateUpdate.splice(courseIndex, 1);
            return {courses: stateUpdate};
        }
        case "setAll": {
            const stateUpdate : Array<ICourse> = action.courseList ? action.courseList : state.courses
            
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
    const [semester, setSemester] = useState("")
    const [year, setYear] = useState("")
    const [name, setName] = useState("")
    const [saved, setSaved] = useState(true)

    const overlap = (course1: ICourse, course2: ICourse) : boolean => {
        const startDate1 = moment(course1["start_time"], 'DD/MM/YYYY hh:mm')
        const endDate1 = moment(course1["end_time"], 'DD/MM/YYYY hh:mm A')
        const startDate2 = moment(course2["start_time"], 'DD/MM/YYYY hh:mm')
        const endDate2 = moment(course2["end_time"], 'DD/MM/YYYY hh:mm A')

        const daysSame = (course1.on_monday && course1.on_monday === course2.on_monday)
            || (course1.on_tuesday && course1.on_tuesday === course2.on_tuesday)
            || (course1.on_wednesday && course1.on_wednesday === course2.on_wednesday)
            || (course1.on_thursday && course1.on_thursday === course2.on_thursday)
            || (course1.on_friday && course1.on_friday === course2.on_friday)

        return (startDate1.isBefore(endDate2) && startDate2.isBefore(endDate1) && daysSame) as boolean
    }
    const inSchedule = (course : ICourse) : boolean => {
        return activeCourses.courses.some((e : ICourse) => (e.id === course.id))
    }

    const { user, setUser, scheduleExists, addUserSchedule, updateUserSchedule } = useContext(UserContext) as UserContextType
    const saveSchedule = () => {
        console.log("saving")
        let activeIds = activeCourses.courses.map( (value: ICourse) => {
            return {id: value.id}
        })
        let tentativeIds = tentativeCourses.courses.map( (value: ICourse) => {
            return {id: value.id}
        })
        let requestBody = {
            scheduleName: name,
            semester: semester,
            year: year,
            tentativeCourses: tentativeIds,
            activeCourses: activeIds
        }

        let schedule: ISchedule = {
            scheduleName: name,
            semester: semester,
            year: year,
            tentativeCourses: tentativeCourses.courses,
            activeCourses: activeCourses.courses
        }
        console.log(name)
        if (scheduleExists(name)) {
            axios
                .post( "/users/update-schedule", JSON.stringify(requestBody),{headers: authHeader()})
                .then(response => {
                    console.log(response);
                    if (response.status === 200) {
                        setSaved(true)
                        updateUserSchedule(schedule)
                        // state.courses.findIndex((x) => x.id === action.course!.id);
                    }
                });
        } else {
            axios
                .post( "/users/add-schedule", JSON.stringify(requestBody),{headers: authHeader()})
                .then(response => {
                    console.log(response);
                    if (response.status === 200) {
                        setSaved(true)
                        addUserSchedule(schedule)
                    }
                });
        }

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
    const value = {
        activeCourses, setActiveCourses, 
        tentativeCourses, setTentativeCourses, 
        saved, saveSchedule,
        name, setName,
        semester, setSemester,
        year, setYear,
        calcActiveCredits, 
        inSchedule, overlap
    }

    return (
        <ScheduleContext.Provider value={value}>
            {props.children}
        </ScheduleContext.Provider>
    )

}

