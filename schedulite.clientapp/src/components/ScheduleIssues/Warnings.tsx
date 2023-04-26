
import React, {useContext, useEffect, useState} from 'react'
import {ScheduleContext, ScheduleContextType} from "../../context/ScheduleContext";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {HiOutlineMinus, HiX} from "react-icons/hi";
import ICourse from "../../types/course.type";

const Warnings = () => {
    const { warnings, setActiveCourses, setTentativeCourses } = useContext(ScheduleContext) as ScheduleContextType
    let scheduleWarnings = warnings()
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
                (scheduleWarnings.credits.value || scheduleWarnings.sameCourse.value) && (
                    <div>
                        <div className={"issue-container warning"}>
                            {
                                scheduleWarnings.credits.value && (
                                    <div className={"issue"}>
                                        <div className={"error-container-title warning-title"}>
                                            Warnings
                                        </div>
                                        <div className={"error-container-subtitle"}>
                                            <ErrorOutlineIcon sx={{paddingRight: "5px"}}/> {scheduleWarnings.credits.message}
                                        </div>
                                    </div>
                                )
                            }
                            {
                                scheduleWarnings.sameCourse.value && (
                                    <div className={"issue"}>
                                        <div className={"error-container-subtitle"}><ErrorOutlineIcon
                                            sx={{paddingRight: "5px"}}/> Same courses:
                                        </div>
                                        <div className={"error-courses-container"}>
                                            {
                                                scheduleWarnings.sameCourse.courses.map((course) => {
                                                    return (
                                                        <div className={"error-course"}>
                                                            <div className={"error-course-title"}>
                                                                {/*<ErrorOutlineIcon sx={{*/}
                                                                {/*    paddingRight: "5px",*/}
                                                                {/*    fontSize: "16px"*/}
                                                                {/*}}/>*/}
                                                                {course.courseTitle}
                                                            </div>
                                                            <div className={"action-buttons"}>
                                                                <button className="course-button" type="button"
                                                                        onClick={() => activeToTentative(course)}>
                                                                    <HiOutlineMinus/>
                                                                </button>
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
                        </div>
                    </div>
                )
            }
        </>

    );
}

export default Warnings
