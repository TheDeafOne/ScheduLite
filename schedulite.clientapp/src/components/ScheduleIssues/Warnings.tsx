
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useContext } from 'react';
import { HiOutlineMinus, HiX } from "react-icons/hi";
import { ScheduleContext, ScheduleContextType } from "../../context/ScheduleContext";
import ICourse from "../../types/course.type";

const Warnings = () => {
    const { warnings, setActiveCourses, setTentativeCourses } = useContext(ScheduleContext) as ScheduleContextType
    // let scheduleWarnings = warnings()
    console.log("WARNINGS UPDATED")
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
                (warnings.credits.value || warnings.sameCourse.value) && (
                    <div>
                        <div className={"issue-container warning"}>
                            <div className={"error-container-title warning-title"}>
                                Warnings
                            </div>
                            {
                                warnings.credits.value && (
                                    <div className={"issue"}>
                                        <div className={"error-container-subtitle"}>
                                            <ErrorOutlineIcon sx={{ paddingRight: "5px" }} /> {warnings.credits.message}
                                        </div>
                                    </div>
                                )
                            }
                            {
                                warnings.sameCourse.value && (
                                    <div className={"issue"}>
                                        <div className={"error-container-subtitle"}><ErrorOutlineIcon
                                            sx={{ paddingRight: "5px" }} /> Same courses:
                                        </div>
                                        <div className={"error-courses-container"}>
                                            {
                                                warnings.sameCourse.courses.map((course) => {
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
                                                                    <HiOutlineMinus />
                                                                </button>
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
                        </div>
                    </div>
                )
            }
        </>

    );
}

export default Warnings
