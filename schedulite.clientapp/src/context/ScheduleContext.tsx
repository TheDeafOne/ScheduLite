import React, {createContext, useContext, useEffect, useReducer, useRef, useState} from "react";
import axios from "../api/axios-config";
import authHeader from "../services/auth-header";
import ICourse from "../types/course.type";
import ISchedule from "../types/schedule.type";
import { UserContext, UserContextType } from "./UserContext";
import moment from "moment";

type Action = { course: ICourse | null, type: 'add' | 'remove' | 'setAll', unshift?: boolean | null, courseList?: ICourse[] | null }

type Dispatch = (action: Action) => void
type State = { courses: Array<ICourse> }
type Errors = { overlap: { value: boolean, courses: Array<ICourse> } }
type Warnings = { credits: { value: boolean, message: string }, sameCourse: { value: boolean, courses: Array<ICourse>, message: string } }
export interface ScheduleContextType {
    activeCourses: State,
    setActiveCourses: Dispatch,
    tentativeCourses: State,
    setTentativeCourses: Dispatch,
    calcActiveCredits: () => number,
    calcTentativeCredits: () => number,
    inSchedule: (course: ICourse) => boolean,
    overlap: (course1: ICourse, course2: ICourse) => boolean,
    saved: boolean,
    year: string,
    setYear: React.Dispatch<React.SetStateAction<string>>,
    name: string,
    setName: React.Dispatch<React.SetStateAction<string>>,
    semester: string,
    setSemester: React.Dispatch<React.SetStateAction<string>>,
    saveSchedule: () => void,
    errors: Errors,
    warnings: Warnings,
    onScheduleOpen: (active: ICourse[], tentative: ICourse[]) => void,
    modal: any,
    setModal: React.Dispatch<React.SetStateAction<any>>,
    modalIsOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    warningsOpen: React.MutableRefObject<boolean>,
    errorsOpen: React.MutableRefObject<boolean>
}
export const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

function coursesReducer(state: State, action: Action) {
    switch (action.type) {
        case "add": {
            if (action.course) {
                return {
                    courses: action.unshift ? [action.course, ...state.courses] : [...state.courses, action.course]
                }
            } else return { courses: state.courses }
            // return {
            //     courses: action.unshift ? [action.course, ...state.courses] : [...state.courses, action.course]
            // }
        }
        case "remove": {
            let courseIndex = -1
            if (action.course) {
                courseIndex = state.courses.findIndex((x) => x.id === action.course!.id);
            }
            // if no match, return the previous state
            if (courseIndex < 0) return state;
            // avoid mutating the original state, create a copy
            const stateUpdate = [...state.courses];
            // then splice it out from the array
            stateUpdate.splice(courseIndex, 1);
            return { courses: stateUpdate };
        }
        case "setAll": {
            const stateUpdate: Array<ICourse> = action.courseList ? action.courseList : state.courses

            return { courses: stateUpdate };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

export const ScheduleProvider = (props: any) => {
    const [activeCourses, setActiveCourses] = useReducer(coursesReducer, { courses: [] })
    const [tentativeCourses, setTentativeCourses] = useReducer(coursesReducer, { courses: [] })

    const [semester, setSemester] = useState("")
    const [year, setYear] = useState("")
    const [name, setName] = useState("")
    const [saved, setSaved] = useState(true)
    const [errors, setErrors] = useState<Errors>({ overlap: { value: false, courses: [] } })
    const [warnings, setWarnings] = useState<Warnings>({ credits: { value: false, message: "" }, sameCourse: { value: false, courses: [], message: "" } })
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modal, setModal] = useState(null);
    const warningsOpen = useRef(true);
    const errorsOpen = useRef(true);


    // const issuesExist = () => {
    //     let warning = warnings()
    //     let error = errors()
    //     return warning.credits.value && warning.sameCourse.value && error.overlap.value
    // }

    const overlap = (course1: ICourse, course2: ICourse): boolean => {
        const startDate1 = moment(course1["startTime"], 'YYYY/MM/DD h:mm:ss')
        const endDate1 = moment(course1["endTime"], 'YYYY/MM/DD h:mm:ss')
        const startDate2 = moment(course2["startTime"], 'YYYY/MM/DD h:mm:ss')
        const endDate2 = moment(course2["endTime"], 'YYYY/MM/DD h:mm:ss')

        const daysSame = (course1.onMonday && course1.onMonday === course2.onMonday)
            || (course1.onTuesday && course1.onTuesday === course2.onTuesday)
            || (course1.onWednesday && course1.onWednesday === course2.onWednesday)
            || (course1.onThursday && course1.onThursday === course2.onThursday)
            || (course1.onFriday && course1.onFriday === course2.onFriday)

        return (startDate1.isBefore(endDate2) && startDate2.isBefore(endDate1) && daysSame) as boolean
    }
    const inSchedule = (course: ICourse): boolean => {
        return activeCourses.courses.some((e: ICourse) => (e.id === course.id))
    }


    const { scheduleExists, addUserSchedule, updateUserSchedule } = useContext(UserContext) as UserContextType
    const saveSchedule = () => {
        if (name === "") {
            return;
        }
        let activeIds = activeCourses.courses.map((value: ICourse) => {
            return { id: value.id }
        })
        let tentativeIds = tentativeCourses.courses.map((value: ICourse) => {
            return { id: value.id }
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
        if (scheduleExists(name)) {
            axios
                .post("/users/update-schedule", JSON.stringify(requestBody), { headers: authHeader() })
                .then(response => {
                    if (response.status === 200) {
                        setSaved(true)
                        updateUserSchedule(schedule)
                        // state.courses.findIndex((x) => x.id === action.course!.id);
                    }
                });
        } else {
            axios
                .post("/users/add-schedule", JSON.stringify(requestBody), { headers: authHeader() })
                .then(response => {
                    if (response.status === 200) {
                        setSaved(true)
                        addUserSchedule(schedule)
                    }
                });
        }

    }
    const calcActiveCredits = (): number => {
        let credits: number = 0
        activeCourses.courses.forEach(function (elem: ICourse, index: number) {
            credits += +elem.creditHours;
        });
        return credits
    }
    const calcTentativeCredits = (): number => {
        let credits: number = 0
        tentativeCourses.courses.forEach(function (elem: ICourse, index: number) {
            credits += +elem.creditHours;
        });
        return credits
    }
    const onScheduleOpen = (active: ICourse[], tentative: ICourse[]) => {
        active.forEach(function (course: ICourse, index: number, array: Array<ICourse>) {
            array[index].convertedStartDate = moment(course["startTime"], 'YYYY/MM/DD h:mm:ss');
            array[index].convertedEndDate = moment(course["endTime"], 'YYYY/MM/DD h:mm:ss');
        })
        tentative.forEach(function (course: ICourse, index: number, array: Array<ICourse>) {
            array[index].convertedStartDate = moment(course["startTime"], 'YYYY/MM/DD h:mm:ss');
            array[index].convertedEndDate = moment(course["endTime"], 'YYYY/MM/DD h:mm:ss');
        })
        for (const course of active) {
            const inSchedule = active.some((e: ICourse) => (e.id === course.id))
            course.overlap = inSchedule && active.some((e: ICourse) => (e.id !== course.id
                && overlap(e, course)));
        }
    }
    useEffect(() => {
        if (name !== null) {
            setSaved(false);
            saveSchedule();

            for (const course of activeCourses.courses) {
                const inSchedule = activeCourses.courses.some((e: ICourse) => (e.id === course.id))
                course.overlap = inSchedule && activeCourses.courses.some((e: ICourse) => (e.id !== course.id
                    && overlap(e, course)));
            }
            let coursesWithOverlap = activeCourses.courses.filter((course) => course.overlap);
            console.log(activeCourses.courses);
            console.log(coursesWithOverlap);
            // console.log(errors)
            setErrors({
                    overlap: {
                        value: coursesWithOverlap.length > 0,
                        courses: coursesWithOverlap
                    }
                }
            );
            let sameCourseDiffSections = activeCourses.courses.filter((course) => activeCourses.courses.some((i) => (course !== i) && (course.courseTitle === i.courseTitle)));

            setWarnings({
                credits: {
                    value: calcActiveCredits() > 18,
                    message: `Number of active credits ${calcActiveCredits()} is greater 18.`
                },
                sameCourse: {
                    value: sameCourseDiffSections.length > 0,
                    courses: sameCourseDiffSections,
                    message: "Schedule contains two of the same course with different sections."
                }
            });
        }
        // eslint-disable-next-line
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
        calcTentativeCredits,
        inSchedule, overlap,
        errors, warnings,
        onScheduleOpen,
        modal, setModal,
        modalIsOpen, setIsOpen,
        warningsOpen, errorsOpen
    }

    return (
        <ScheduleContext.Provider value={value}>
            {props.children}
        </ScheduleContext.Provider>
    )

}

