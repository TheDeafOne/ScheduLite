
import { useContext, useEffect, useState } from 'react';
import { BiListCheck, BiListPlus } from 'react-icons/bi';
import { HiCheck, HiOutlinePlus } from 'react-icons/hi';
import "./Course.scss";

import { ScheduleContext, ScheduleContextType } from "../../context/ScheduleContext";
import DeleteCourseButton from "../../styles/globals/DeleteCourseButton";
import ICourse from "../../types/course.type";


const Course = (props: any) => {
    const { name, activeCourses, tentativeCourses, setActiveCourses, setTentativeCourses } = useContext(ScheduleContext) as ScheduleContextType

    const course: ICourse = props.course
    const validDate = course.convertedStartDate!.isValid() || course.convertedEndDate!.isValid()
    const onCourseClick = (event: any) => {
        props.onCourseClick(course)
        console.log(validDate)
    }

    const [active, setActive] = useState(activeCourses.courses.some((e: ICourse) => e.id === course.id))
    const [tentative, setTentative] = useState(tentativeCourses.courses.some((e: ICourse) => e.id === course.id))
    useEffect(() => {
        setActive(activeCourses.courses.some((e: ICourse) => e.id === course.id))
        setTentative(tentativeCourses.courses.some((e: ICourse) => e.id === course.id))
        // eslint-disable-next-line
    }, [course])

    const addToActive = (event: any) => {
        event.stopPropagation()
        setTentative(false)
        if (!active) {
            setActiveCourses({course: course, type: "add"})
            setTentativeCourses({course: course, type: "remove"})
        } else {
            setActiveCourses({course: course, type: "remove"})
        }
        setActive(!active)


        // if (props.onMouseLeave) {
        //     props.onMouseLeave()
        // }
    }
    const addToTentative = (event: any) => {
        event.stopPropagation();
        setActive(false)
        if (!tentative) {
            setTentativeCourses({ course: course, type: "add" })
            setActiveCourses({ course: course, type: "remove" })
        } else {
            setTentativeCourses({ course: course, type: "remove" })
        }
        setTentative(!tentative)
    }
    const onClick = (event: any) => {
        event.stopPropagation();
        props.switchAction(course)
        props.onMouseLeave();
    }

    const conditionalRemoveCourse = () => {
        props.schedule === "active"
            ? setActiveCourses({ course: course, type: "remove" })
            : setTentativeCourses({ course: course, type: "remove" })
        props.onMouseLeave();
    }

    return (
        <>
            {props.panel ?
                (<div className={`course ${props.overlap ? 'overlap' : ''}`}
                    onClick={onCourseClick}
                    onMouseEnter={() => props.onMouseEnter ? props.onMouseEnter(course) : null}
                    onMouseLeave={props.onMouseLeave ? props.onMouseLeave : null}
                    key={props.courseKey}>
                    <div className={`class-info`}>
                        <div className={"course-title"}>
                            {course.courseTitle}
                        </div>
                        <div className={"subtitle"}>
                            {course.coursePrefix} {course.courseNumber}{course.courseSection} {course.convertedStartDate && validDate ?
                                <> | {course.convertedStartDate.format("h:mm")} - </>
                                : ""}
                            {course.convertedEndDate && validDate ?
                                course.convertedEndDate.format("h:mm")
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
                            <DeleteCourseButton />
                        </button>
                        {/*<button type="button" onClick={onClick}><BiAddToQueue /></button>*/}
                    </div>

                </div>)
                :
                (<div className={`course ${props.overlap ? 'overlap' : ''}`} onClick={onCourseClick} key={props.courseKey}>
                    <div className={"class-info"}>
                        <div className={"course-title"}>
                            {course.coursePrefix} {course.courseNumber}{course.courseSection} - <span className={"course-name"}>{course.courseTitle}</span>
                        </div>

                        <div className={"subtitle"}>
                            <span>
                                {course.semester} |
                            </span>
                            {validDate && (
                                <span>
                                    &nbsp;{(course.convertedStartDate && validDate) ?
                                        <>{course.convertedStartDate.format("hh:mm")} - </>
                                        : ""}
                                    {course.convertedEndDate && validDate ?
                                        course.convertedEndDate.format("hh:mm")
                                        : ""} |

                                </span>
                            )}
                            <span>
                                &nbsp;{course.lastName}
                            </span>
                        </div>
                        {/*{props.data.id}*/}
                    </div>


                    {/*ONLY SHOW THE BUTTON IF THE USER IS SIGNED IN*/}
                    {name !== "" &&
                        <div className={"add-course"}>
                            <button className="course-button" type="button" title="Add a course to active schedule!" onClick={addToActive}>
                                {active
                                    ? <HiCheck style={{ color: "lightgreen" }} />
                                    : <HiOutlinePlus />}
                            </button>
                            <button className="course-button" type="button" title="Add a course to tentative schedule!" onClick={addToTentative}>
                                {tentative
                                    ? <BiListCheck style={{ color: "lightgreen" }} />
                                    : <BiListPlus />
                                }

                            </button>
                        </div>
                    }

                </div>)
            }
        </>
    )
}

export default Course
