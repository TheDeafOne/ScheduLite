
import React, {useContext, useEffect, useState} from 'react'
import axiosConfig from "../../api/axios-config";
import SearchPage from "../../screens/SearchScreen/SearchPage";
import "../../styles/Course.css"
import { BiListPlus, BiListCheck } from 'react-icons/bi'
import { HiOutlinePlus, HiOutlineMinus, HiX, HiCheck } from 'react-icons/hi'
import { MdOutlinePlaylistAddCheck, MdOutlinePlaylistAdd } from "react-icons/md";

import { BiAddToQueue } from 'react-icons/bi'
import {ScheduleContext, ScheduleContextType} from "../../context/ScheduleContext";
import ICourse from "../../types/course.type";


const Course = (props : any) => {
    const { setActiveCourses, setTentativeCourses } = useContext(ScheduleContext) as ScheduleContextType
    const course: ICourse = props.course
    const onCourseClick = (event : any) => {
        props.onCourseClick(course)
    }
    const [active, setActive] = useState(props.active)
    const [tentative, setTentative] = useState(props.tentative)
    const addToActive = (event : any) => {
        event.stopPropagation();
        setTentative(false)
        if (!active) {
            setActiveCourses({course: course, type: "add"})
            setTentativeCourses({course: course, type: "remove"})
        } else {
            setActiveCourses({course: course, type: "remove"})
        }
        setActive(!active)
    }
    const addToTentative = (event : any) => {
        event.stopPropagation();
        setActive(false)
        if (!tentative) {
            setTentativeCourses({course: course, type: "add"})
            setActiveCourses({course: course, type: "remove"})
        } else {
            setTentativeCourses({course: course, type: "remove"})
        }
        setTentative(!tentative)
    }
    const onClick = (event : any) => {
        event.stopPropagation();
        props.switchAction(course)
    }
    const conditionalRemoveCourse = () => {
        props.schedule==="active"
            ? setActiveCourses({course: course, type: "remove"})
            : setTentativeCourses({course: course, type: "remove"})
    }

    return (
        <>
            {props.panel ?
                (<div className={`course ${props.overlap ? 'overlap' : ''}`}
                      onClick={onCourseClick}
                      onMouseEnter={() => props.onMouseEnter ? props.onMouseEnter(course.course_title) : null}
                      onMouseLeave={props.onMouseLeave ? props.onMouseLeave : null}
                      key={props.courseKey}>
                    <div className={`class-info`}>
                        <div className={"course-title"}>
                            {course.course_title}
                        </div>
                        <div className={"subtitle"}>
                            {course.course_prefix} {course.course_number}{course.course_section} | {course.converted_start_date ?
                                course.converted_start_date.format("hh:mm")
                                : ""}
                            -
                            {course.converted_end_date ?
                                course.converted_end_date.format("hh:mm")
                                : ""}
                        </div>
                    </div>

                    {/*ONLY SHOW THE BUTTON IF THE USER IS SIGNED IN*/}
                    <div className={`add-course panel`}>
                        <button className="course-button" type="button" onClick={onClick}>{props.button}</button>
                        <button
                            className="course-button"
                            type="button"
                            onClick={conditionalRemoveCourse}>
                            <HiX style={{color: "red"}}/>
                        </button>
                        {/*<button type="button" onClick={onClick}><BiAddToQueue /></button>*/}
                    </div>

                </div>)
                :
                (<div className={`course ${props.overlap ? 'overlap' : ''}`} onClick={onCourseClick} key={props.courseKey}>
                    <div className={"class-info"}>
                        <div className={"course-title"}>
                            {course.course_prefix} {course.course_number}{course.course_section} - <span className={"course-name"}>{course.course_title}</span>
                        </div>

                        <div className={"subtitle"}>
                        {course.semester} |
                        {course.converted_start_date ?
                            course.converted_start_date.format("hh:mm")
                            : ""}
                        -
                        {course.converted_end_date ?
                            course.converted_end_date.format("hh:mm")
                            : ""}
                        </div>
                        {/*{props.data.id}*/}
                    </div>


                    {/*ONLY SHOW THE BUTTON IF THE USER IS SIGNED IN*/}
                    <div className={"add-course"}>
                        <button className="course-button" type="button" title="Add a course to active schedule!" onClick={addToActive}>
                            {active
                                ? <HiCheck style={{color: "lightgreen"}}/>
                                : <HiOutlinePlus />}
                        </button>
                        <button className="course-button" type="button" title="Add a course to tentative schedule!" onClick={addToTentative}>
                            {tentative
                                ? <BiListCheck style={{color: "lightgreen"}}/>
                                : <BiListPlus />
                            }

                        </button>
                    </div>

                </div>)
            }
    </>
    )
}

export default Course
