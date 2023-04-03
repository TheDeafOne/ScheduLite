
import React, {useContext, useEffect, useState} from 'react'
import axiosConfig from "../../api/axios-config";
import SearchPage from "../../screens/SearchScreen/SearchPage";
import Course from "./Course";
import "../../styles/Results.css"
import ICourse from "../../types/course.type";
import courseDetailPanel from "./CourseDetailPanel";
import moment from "moment";
import course from "./Course";
import {ScheduleContext, ScheduleContextType} from "../../context/ScheduleContext";


const Results = (props : any) => {

    const { activeCourses, tentativeCourses } = useContext(ScheduleContext) as ScheduleContextType

    const overLap = (course1 : ICourse, course2: ICourse) => {
        const startDate1 = moment(course1["start_time"], 'DD/MM/YYYY hh:mm')
        const endDate1 = moment(course1["end_time"], 'DD/MM/YYYY hh:mm A')
        const startDate2 = moment(course2["start_time"], 'DD/MM/YYYY hh:mm')
        const endDate2 = moment(course2["end_time"], 'DD/MM/YYYY hh:mm A')

        const daysSame = (course1.on_monday && course1.on_monday === course2.on_monday)
            || (course1.on_tuesday && course1.on_tuesday === course2.on_tuesday)
            || (course1.on_wednesday && course1.on_wednesday === course2.on_wednesday)
            || (course1.on_thursday && course1.on_thursday === course2.on_thursday)
            || (course1.on_friday && course1.on_friday === course2.on_friday)

        return (startDate1.isBefore(endDate2) && startDate2.isBefore(endDate1) && daysSame)
    }

    return (
        <>
            {
                props.response[0] ?
                    (
                        <div className={"results"}>
                            {
                                props.response.map((data : ICourse , idx: number) => {

                                    if (props.sched) {
                                        const inSchedule = activeCourses.courses.some((e : ICourse) => (e.id === data.id))
                                        const actOverlap = inSchedule && activeCourses.courses.some((e : ICourse) => (e.id !== data.id
                                            && overLap(e, data)));

                                        const tent = tentativeCourses.courses.some((e : ICourse) => e.id === data.id)
                                        const act = activeCourses.courses.some((e : ICourse) => e.id === data.id)

                                        return (
                                            // <Course /> WILL PROBABLY GO HERE WITH ALL THE INFORMATION ABOUT EACH COURSE
                                            <Course course={data}
                                                    idx={idx}
                                                    key={idx}
                                                    courseKey={idx}
                                                // props={...props}
                                                    onCourseClick={props.onCourseClick}
                                                    panel={props.panel}
                                                    onMouseEnter={props.onMouseEnter}
                                                    onMouseLeave={props.onMouseLeave}
                                                    switchAction={props.switchAction}
                                                    button={props.button}
                                                    schedule={props.schedule}
                                                    active={act}
                                                    tentative={tent}
                                                    overlap={actOverlap}
                                            />
                                        )
                                    } else {
                                        // console.log("not props.sched")
                                        const actOverlap = props.response.some((e : ICourse) => (e.id !== data.id
                                            && overLap(e, data)
                                            && (props.schedule==="active")))
                                        return (
                                            <Course course={data}
                                                    idx={idx}
                                                    key={idx}
                                                // props={...props}
                                                    onCourseClick={props.onCourseClick}
                                                    panel={props.panel}
                                                    onMouseEnter={props.onMouseEnter}
                                                    onMouseLeave={props.onMouseLeave}
                                                    switchAction={props.switchAction}
                                                    button={props.button}
                                                    schedule={props.schedule}
                                                    overlap={actOverlap}
                                            />
                                        )
                                    }

                                })
                            }
                        </div>
                    )
                    :
                    <div>
                        {/*No results found!*/}
                    </div>
            }

        </>


    )
}

export default Results