
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useContext, useState } from 'react';
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { ScheduleContext, ScheduleContextType } from "../../context/ScheduleContext";
import AddToTentativeButton from "../../styles/globals/AddToTentativeButton";
import DeleteCourseButton from "../../styles/globals/DeleteCourseButton";
import ICourse from "../../types/course.type";

const Warnings = () => {
    const { warnings, setActiveCourses, setTentativeCourses, warningsOpen } = useContext(ScheduleContext) as ScheduleContextType
    // let scheduleWarnings = warnings()
    console.log("WARNINGS UPDATED")
    const [open, setOpen] = useState(warningsOpen.current);
    const conditionalRemoveCourse = (course: ICourse) => {
        setActiveCourses({ course: course, type: "remove" });
    }
    const activeToTentative = (course: ICourse) => {
        setTentativeCourses({ course: course, type: "add", unshift: true })
        setActiveCourses({ course: course, type: "remove" })
    }
    const toggleWarnings = () => {
        warningsOpen.current = !open
        setOpen(!open)
    }
    return (

        <>
            {
                (warnings.credits.value || warnings.sameCourse.value) && (
                    <div>
                        <div className={"issue-container warning"}>
                            <div className={"error-container-title warning-title"}>
                                Warnings
                                <button
                                    className="course-button"
                                    type="button"
                                    onClick={toggleWarnings}>
                                    {
                                        open ?
                                            <HiChevronDown/>
                                            :
                                            <HiChevronRight/>
                                    }
                                </button>
                            </div>
                            {open &&
                                <>
                                    {
                                        warnings.credits.value && (
                                            <div className={"issue"}>
                                                <div className={"error-container-subtitle"}>
                                                    <ErrorOutlineIcon sx={{paddingRight: "5px"}}/> {warnings.credits.message}
                                                </div>
                                            </div>
                                        )
                                    }
                                    {
                                        warnings.sameCourse.value && (
                                            <div className={"issue"}>
                                                <div className={"error-container-subtitle"}><ErrorOutlineIcon
                                                    sx={{paddingRight: "5px"}}/> Same courses:
                                                </div>
                                                <div className={"error-courses-container"}>
                                                    {
                                                        warnings.sameCourse.courses.map((course) => {
                                                            return (
                                                                <div className={"error-course"}>
                                                                    <div className={"error-course-title"}>
                                                                        {course.courseTitle}
                                                                    </div>
                                                                    <div className={"action-buttons"}>
                                                                        <button className="course-button" type="button"
                                                                                onClick={() => activeToTentative(course)}>
                                                                            <AddToTentativeButton/>
                                                                        </button>
                                                                        <button
                                                                            className="course-button"
                                                                            type="button"
                                                                            onClick={() => conditionalRemoveCourse(course)}>
                                                                            <DeleteCourseButton/>
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
                            }

                        </div>
                    </div>
                )
            }
        </>

    );
}

export default Warnings
