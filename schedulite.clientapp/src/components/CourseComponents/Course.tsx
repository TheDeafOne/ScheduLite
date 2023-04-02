
import React, {useEffect, useState} from 'react'
import axiosConfig from "../../api/axios-config";
import SearchPage from "../../screens/SearchScreen/SearchPage";
import "../../styles/Course.css"
import { BiListPlus, BiListCheck } from 'react-icons/bi'
import { HiOutlinePlus, HiOutlineMinus, HiX, HiCheck } from 'react-icons/hi'
import { MdOutlinePlaylistAddCheck, MdOutlinePlaylistAdd } from "react-icons/md";

import { BiAddToQueue } from 'react-icons/bi'

enum PanelStates {
    active,
    tentative
}
enum ResultState {
    addedToActive,
    addedToTentative
}

const Course = (props : any) => {

    // console.log(props.response)
    const onCourseClick = (event : any) => {
        // console.log(props)
        props.onCourseClick(props.data)
    }
    // console.log("OVER LAP FROM COURSE")
    // console.log(props.overlap)
    const [active, setActive] = useState(props.active)
    const [tentative, setTentative] = useState(props.tentative)
    // console.log("FROM COURSE")
    // console.log(props)
    // console.log(active)
    // console.log(tentative)
    // console.log("END")
    const addToActive = (event : any) => {
        // console.log("add to active")
        event.stopPropagation();
        // console.log(active)
        setTentative(false)
        if (!active) {
            props.addCourse(props.data, "active")
            props.removeCourse(props.data.id, "tentative")
        } else {
            props.removeCourse(props.data.id, "active")
        }
        setActive(!active)
        // props.
    }
    const addToTentative = (event : any) => {
        console.log("add to tentative")
        event.stopPropagation();
        setActive(false)
        if (!tentative) {
            props.addCourse(props.data, "tentative")
            props.removeCourse(props.data.id, "active")
        } else {
            props.removeCourse(props.data.id, "tentative")
        }
        setTentative(!tentative)
    }
    const onClick = (event : any) => {
        event.stopPropagation();
        // console.log(props);
        props.switchAction(props.data.id)
        // ADD TO SCHEDULE HERE
        // axiosConfig.get("https://64161c4d351c4aed49178971.mockapi.io/api/v1/courses")
        //     .then(r => {
        //         console.log((r.data));
        //     })
        // HANDLE BAD ADDITION TO SCHEDULE

    }

    return (
        <>
            {props.panel ?
                (<div className={`course ${props.overlap ? 'overlap' : ''}`}
                      onClick={onCourseClick}
                      onMouseEnter={() => props.onMouseEnter ? props.onMouseEnter(props.data.course_title) : null}
                      onMouseLeave={props.onMouseLeave ? props.onMouseLeave : null}
                      key={props.data.key}>
                    <div className={`class-info`}>
                        <div className={"course-title"}>
                            {props.data.course_title}
                        </div>
                        <div className={"subtitle"}>
                            {props.data.course_prefix} {props.data.course_number}{props.data.course_section} | {props.data.semester}

                        </div>
                        {/*{props.data.id}*/}
                    </div>

                    {/*ONLY SHOW THE BUTTON IF THE USER IS SIGNED IN*/}
                    <div className={`add-course panel`}>
                        <button type="button" onClick={onClick}>{props.button}</button>
                        <button type="button" onClick={() => props.removeCourse(props.data.id, props.schedule)}><HiX style={{color: "red"}}/></button>
                        {/*<button type="button" onClick={onClick}><BiAddToQueue /></button>*/}
                    </div>

                </div>)
                :
                (<div className={`course ${props.overlap ? 'overlap' : ''}`} onClick={onCourseClick} key={props.data.key}>
                    <div className={"class-info"}>
                        <div className={"course-title"}>
                            {props.data.course_prefix} {props.data.course_number}{props.data.course_section} - <span className={"course-name"}>{props.data.course_title}</span>
                        </div>

                        <div className={"subtitle"}>
                        {props.data.semester} | {props.data.converted_start_date.format("hh:mm")} - {props.data.converted_end_date.format("hh:mm")}
                        </div>
                        {/*{props.data.id}*/}
                    </div>


                    {/*ONLY SHOW THE BUTTON IF THE USER IS SIGNED IN*/}
                    <div className={"add-course"}>
                        <button type="button" title="Add a course to active schedule!" onClick={addToActive}>
                            {active
                                ? <HiCheck style={{color: "lightgreen"}}/>
                                : <HiOutlinePlus />}
                        </button>
                        <button type="button" title="Add a course to tentative schedule!" onClick={addToTentative}>
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
