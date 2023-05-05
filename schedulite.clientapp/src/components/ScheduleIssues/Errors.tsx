
import React, {useContext, useEffect, useState} from 'react'
import {ScheduleContext, ScheduleContextType} from "../../context/ScheduleContext";
import Warnings from "./Warnings";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ClearIcon from '@mui/icons-material/Clear';
import "./Issues.scss"
import {HiOutlineMinus, HiX} from "react-icons/hi";
import ICourse from "../../types/course.type";

const Errors = () => {
    const { errors, setActiveCourses, setTentativeCourses } = useContext(ScheduleContext) as ScheduleContextType
    // let scheduleErrors = errors()
    console.log("FROM ERRORS")
    console.log(JSON.stringify(errors))
    const conditionalRemoveCourse = (course: ICourse) => {
        setActiveCourses({course: course, type: "remove"});
    }
    const activeToTentative = (course : ICourse) => {
        setTentativeCourses({course: course, type: "add", unshift: true})
        setActiveCourses({course: course, type:"remove"})
    }
    return (
        <>
            {
                errors.overlap.value && (
                    <div className={"issue-container error"}>
                        <div className={"error-container-title error-title"}>Errors</div>
                        <div className={"error-container-subtitle"}><ErrorOutlineIcon sx={{paddingRight: "5px"}}/>Courses overlap: </div>
                        <div className={"error-courses-container"}>
                            {
                                errors.overlap.courses.map((course) => {
                                    return (
                                        <div className={"error-course"}>
                                            <div className={"error-course-title"}>
                                                {course.courseTitle}
                                            </div>
                                            <div className={"action-buttons"}>
                                                <button className="course-button" type="button" onClick={() => activeToTentative(course)}><HiOutlineMinus /></button>
                                                <button
                                                    className="course-button"
                                                    type="button"
                                                    onClick={() => conditionalRemoveCourse(course)}>
                                                    <HiX style={{color: "red"}}/>
                                                </button>
                                            </div>
                                                {/*<button type="button" onClick={onClick}><BiAddToQueue /></button>*/}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}
export default Errors