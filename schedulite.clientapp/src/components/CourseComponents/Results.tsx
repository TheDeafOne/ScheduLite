
import moment from "moment";
import { useContext } from 'react';
import { ScheduleContext, ScheduleContextType } from "../../context/ScheduleContext";
import "../../styles/Results.css";
import ICourse from "../../types/course.type";
import Course from "./Course";


const Results = (props: any) => {

    const { activeCourses, tentativeCourses } = useContext(ScheduleContext) as ScheduleContextType

    const overLap = (course1: ICourse, course2: ICourse) => {
        const startDate1 = moment(course1["startTime"], 'DD/MM/YYYY hh:mm')
        const endDate1 = moment(course1["endTime"], 'DD/MM/YYYY hh:mm A')
        const startDate2 = moment(course2["startTime"], 'DD/MM/YYYY hh:mm')
        const endDate2 = moment(course2["endTime"], 'DD/MM/YYYY hh:mm A')

        const daysSame = (course1.onMonday && course1.onMonday === course2.onMonday)
            || (course1.onTuesday && course1.onTuesday === course2.onTuesday)
            || (course1.onWednesday && course1.onWednesday === course2.onWednesday)
            || (course1.onThursday && course1.onThursday === course2.onThursday)
            || (course1.onFriday && course1.onFriday === course2.onFriday)

        return (startDate1.isBefore(endDate2) && startDate2.isBefore(endDate1) && daysSame)
    }

    return (
        <>
            {
                props.response[0] ?
                    (
                        <div className={"results"}>
                            {
                                props.response.map((data: ICourse, idx: number) => {

                                    if (props.sched) {
                                        const inSchedule = activeCourses.courses.some((e: ICourse) => (e.id === data.id))
                                        const actOverlap = inSchedule && activeCourses.courses.some((e: ICourse) => (e.id !== data.id
                                            && overLap(e, data)));

                                        const tent = tentativeCourses.courses.some((e: ICourse) => e.id === data.id)
                                        const act = activeCourses.courses.some((e: ICourse) => e.id === data.id)

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
                                        const actOverlap = props.response.some((e: ICourse) => (e.id !== data.id
                                            && overLap(e, data)
                                            && (props.schedule === "active")))
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