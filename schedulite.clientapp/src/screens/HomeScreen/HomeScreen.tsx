import React, {useContext, useEffect, useState} from 'react'
import axiosConfig from "../../api/axios-config";
import SearchPage from "../SearchScreen/SearchPage";
import SearchBar from "../SearchScreen/SearchScreenComponents/SearchBar";
import "../../styles/BodyStructure.css"
import CoursePanel from "./CoursePanel";
import CourseDetailPanel from "../../components/CourseComponents/CourseDetailPanel";
import {useNavigate} from "react-router-dom";
import { motion } from "framer-motion"
import ISchedule from "../../types/schedule.type";
import ICourse from "../../types/course.type";

import Calendar from "./Calendar";
import FilterPanel from "../SearchScreen/SearchScreenComponents/FilterPanel";
import {hover} from "@testing-library/user-event/dist/hover";
import {ScheduleContext, ScheduleContextType} from "../../context/ScheduleContext";
const Home = ({ schedule, setSchedule, removeCourse } : { schedule : ISchedule, setSchedule : Function, removeCourse: Function }) => {
    const [response, setResponse] = useState<ICourse[]>();
    const [hoverCourse, setHoverCourse] = useState<ICourse>();
    const [currCourse, setCourse]= useState<ICourse>();
    const [viewCourse, setViewCourse] = useState(false);
    const { saved, saveSchedule } = useContext(ScheduleContext) as ScheduleContextType
    const [scheduleSaved, setScheduleSaved] = useState(false)
    useEffect(() => {
        console.log("CALLLLLEDDDDD")
        setScheduleSaved(saved);
        }, [saved])
    // const {}
    // const saveSchedule = () =>

    const onCourseClick = (course : any) => {
        console.log(course);
        console.log(currCourse);
        if (course === currCourse) {
            setViewCourse(false);
            setCourse(Object);
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
    const courseNames : string[] = schedule.activeCourses.map((elem) => {
        return `{}    ${elem.course_title}    {}`
    })

    const removeEvent = () => {
        setHoverCourse(Object)
    }
    const addEvent = (course : ICourse) => {
        setHoverCourse(course)
        console.log("test")
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
                <CoursePanel schedule={schedule} setSchedule={setSchedule} onMouseEnter={addEvent} onMouseLeave={removeEvent} onCourseClick={onCourseClick} />
                <div className={"center-panel"}>
                    <motion.div
                        key="home"
                        className="container text-center"
                    //     transformOrigin: "top center",
                    // transformOrigin: "top center",
                        initial={{scale: 1 }}
                        animate={{scale: .97 }}
                        transition={{ duration: .75 }}
                    >
                    <SearchBar navigate={routeChange} autofocus={false} firstClick={true}/>
                    </motion.div>
                    {/*{courseNames}*/}
                    <Calendar schedule={schedule} hoverCourse={hoverCourse}/>
                    {/*{hoverCourse.toString()}*/}
                    {/*<motion.div*/}
                    {/*    className={"expand"}*/}
                    {/*    exit={{ zIndex: 100, scale: 50, transformOrigin: "top"}}*/}
                    {/*    transition={{ duration: 2 }}*/}
                    {/*>*/}

                    {/*</motion.div>*/}

                    {/*<ScheduleView />*/}
                    <div className={"save-bar"}>
                        <button className="save-button" type={"button"} onClick={saveSchedule}>Save</button>
                        {
                            scheduleSaved && <span>Saved!</span>
                        }
                    </div>
                </div>
                <CourseDetailPanel course={currCourse} />
            </div>
        </motion.div>
    )
}
export default Home