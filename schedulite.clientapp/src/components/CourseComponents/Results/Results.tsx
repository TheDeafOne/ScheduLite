
import { useContext } from 'react';
import { ScheduleContext, ScheduleContextType } from "../../../context/ScheduleContext";
import ICourse from "../../../types/course.type";
import Course from "../Course";
import "./Results.scss";


const Results = (props: any) => {

    const { overlap, inSchedule, activeCourses, tentativeCourses } = useContext(ScheduleContext) as ScheduleContextType

    return (
        <>
            {
                props.response[0] &&
                (
                    <div className={"results"}>
                        {
                            props.response.map((data: ICourse, idx: number) => {

                                if (props.sched) {
                                    console.log("QWERTYUIOP")
                                    const courseInSchedule = inSchedule(data);
                                    // const inSchedule = activeCourses.courses.some((e : ICourse) => (e.id === data.id))
                                    const actOverlap = courseInSchedule && activeCourses.courses.some((e: ICourse) => (e.id !== data.id
                                        && overlap(e, data)));

                                    // const tent = tentativeCourses.courses.some((e : ICourse) => e.id === data.id)
                                    // const act = activeCourses.courses.some((e : ICourse) => e.id === data.id)

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
                                            // active={act}
                                            // tentative={tent}
                                            overlap={actOverlap}
                                        />
                                    )
                                } else {
                                    // console.log("not props.sched")
                                    console.log("ASDFGHJKL")
                                    // const actOverlap = props.response.some((e : ICourse) => (e.id !== data.id
                                    //     && overlap(e, data)
                                    //     && (props.schedule==="active")))
                                    const courseInSchedule = inSchedule(data);
                                    // const inSchedule = activeCourses.courses.some((e : ICourse) => (e.id === data.id))
                                    const actOverlap = courseInSchedule && activeCourses.courses.some((e: ICourse) => (e.id !== data.id
                                        && overlap(e, data)));

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
            }

        </>


    )
}

export default Results