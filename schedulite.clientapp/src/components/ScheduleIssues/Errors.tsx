
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useContext } from 'react';
import { HiOutlineMinus, HiX } from "react-icons/hi";
import { ScheduleContext, ScheduleContextType } from "../../context/ScheduleContext";
import ICourse from "../../types/course.type";
import "./Issues.scss";

const Errors = () => {
    const { errors, setActiveCourses, setTentativeCourses } = useContext(ScheduleContext) as ScheduleContextType
    let scheduleErrors = errors()
    console.log("ERRORS UPDATED")
    console.log(JSON.stringify(scheduleErrors))
    const conditionalRemoveCourse = (course: ICourse) => {
        setActiveCourses({ course: course, type: "remove" });
    }
    const activeToTentative = (course: ICourse) => {
        setTentativeCourses({ course: course, type: "add", unshift: true })
        setActiveCourses({ course: course, type: "remove" })
    }
    return (
        <>
            {
                scheduleErrors.overlap.value && (
                    <div className={"issue-container error"}>
                        <div className={"error-container-title error-title"}>Errors</div>
                        <div className={"error-container-subtitle"}><ErrorOutlineIcon sx={{ paddingRight: "5px" }} />Courses overlap: </div>
                        <div className={"error-courses-container"}>
                            {
                                scheduleErrors.overlap.courses.map((course) => {
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
                                                    <HiX style={{ color: "red" }} />
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
