import React, {useContext, useEffect, useState} from 'react'
import axiosConfig from "../../api/axios-config";
import SearchPage from "../SearchScreen/SearchPage";
import SearchBar from "../SearchScreen/SearchScreenComponents/SearchBar/SearchBar";
// import "../../styles/BodyStructure.scss"
import "./HomeScreen.scss"
import CoursePanel from "./CoursePanel";
import CourseDetailPanel from "../../components/CourseComponents/CourseDetailPanel";
import {useNavigate} from "react-router-dom";
import { motion } from "framer-motion"
import ISchedule from "../../types/schedule.type";
import ICourse from "../../types/course.type";

import Calendar from "./Calendar/Calendar";
import FilterPanel from "../SearchScreen/SearchScreenComponents/FilterPanel";
import {hover} from "@testing-library/user-event/dist/hover";
import {ScheduleContext, ScheduleContextType} from "../../context/ScheduleContext";
import {UserContext, UserContextType} from "../../context/UserContext";
import {linkedScheduleObjType} from "../../App";
import {Popover} from "@mui/material";
import MouseOverPopover from "../../components/PopOver/Popover";

// import {linkedScheduleObj, linkedScheduleObjType} from "../../App";
const Home = ({ linkedScheduleObj } : { linkedScheduleObj: linkedScheduleObjType }) => {

    const [response, setResponse] = useState<ICourse[]>();
    const [calendarCourseHover, setCalendarCourseHover] = useState<ICourse | undefined>();
    const [tentativeCourseHover, setTentativeCourseHover] = useState<ICourse | undefined>();
    const [currCourse, setCourse]= useState<ICourse | undefined>();
    const [viewCourse, setViewCourse] = useState(false);
    const { saved, saveSchedule } = useContext(ScheduleContext) as ScheduleContextType
    const { user } = useContext(UserContext) as UserContextType

    const [scheduleSaved, setScheduleSaved] = useState(false)
    const [saveMessage, setSavedMessage] = useState("")


    useEffect(() => {
        console.log("CALLLLLEDDDDD")
        setScheduleSaved(saved);
        }, [saved])
    useEffect(() => {
        onSaveClick()
    }, [])
    // useEffect(() => {
    //     saveSchedule()
    // })
    // const {}
    // const saveSchedule = () =>

    const onSaveClick = () => {
        if (user) {
            saveSchedule()
            setSavedMessage("Saved!")
        } else {
            setSavedMessage("Not logged in! Sign in to save schedule")
        }
    }
    const onCourseClick = (course : any) => {
        // console.log(course);
        // console.log(currCourse);
        if (course === currCourse) {
            setViewCourse(false);
            setCourse(undefined);
        } else {
            setViewCourse(true);
            setCourse(course);
        }
    }

    let navigate = useNavigate();
    const routeChange = () =>{
        let path = `/Search`;
        navigate(path);
    }
    // const courseNames : string[] = schedule.activeCourses.map((elem) => {
    //     return `{}    ${elem.course_title}    {}`
    // })

    const removeEvent = () => {
        console.log("remove event")
        setTentativeCourseHover(undefined)
    }
    const addEvent = (course : ICourse) => {
        console.log("add event")
        console.log(typeof course)
        setTentativeCourseHover(course)
        // console.log("test")
    }

    return (
        // <SearchPage />
        <motion.div
            // key="home"
            className="container text-center"
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ scale: 0 }}
            // transition={{ duration: 2 }}
        >
            <div className={"main-body"}>
                {/*<MouseOverPopover />*/}
                <CoursePanel onMouseEnter={addEvent} onMouseLeave={removeEvent} onCourseClick={onCourseClick} />
                <div className={"center-panel"}>
                    <motion.div
                        key="home"
                        className="container text-center"
                        initial={{scale: 1 }}
                        animate={{scale: .97 }}
                        transition={{ duration: .75 }}
                    >
                    <SearchBar navigate={routeChange} autofocus={false} firstClick={true}/>
                    </motion.div>

                    <Calendar tentativeCourseHover={tentativeCourseHover} setCalendarCourseHover={setCalendarCourseHover} setViewCourse={setViewCourse}/>
                    <div className={"save-bar"}>
                        {
                            scheduleSaved && <span className={"saved-text"}>Saved!</span>
                        }

                        {user && <button className="save-button" type={"button"} onClick={onSaveClick}>Save</button>}
                    </div>
                </div>
                <CourseDetailPanel course={currCourse} viewCourse={viewCourse} calendarCourseHover={calendarCourseHover}/>
            </div>
        </motion.div>
    )
}
export default Home