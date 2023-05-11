
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useContext, useState } from 'react';
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { ScheduleContext, ScheduleContextType } from "../../context/ScheduleContext";
import AddToTentativeButton from "../../styles/globals/AddToTentativeButton";
import DeleteCourseButton from "../../styles/globals/DeleteCourseButton";
import ICourse from "../../types/course.type";
import "./Issues.scss";

const Errors = (props: any) => {
    const { errors, setActiveCourses, setTentativeCourses, errorsOpen } = useContext(ScheduleContext) as ScheduleContextType
    // let scheduleErrors = errors()
    const [open, setOpen] = useState(errorsOpen.current);

    console.log("FROM ERRORS")
    console.log(JSON.stringify(errors))
    const conditionalRemoveCourse = (course: ICourse) => {
        setActiveCourses({ course: course, type: "remove" });
    }
    const activeToTentative = (course: ICourse) => {
        setTentativeCourses({ course: course, type: "add", unshift: true })
        setActiveCourses({ course: course, type: "remove" })
    }
    const toggleErrors = () => {
        errorsOpen.current = !open
        setOpen(!open)
    }
    return (
        <>
            {
                errors.overlap.value && (
                    <div className={"issue-container error"}>
                        <div className={"error-container-title error-title"}>
                            Errors
                            <button
                                className="course-button"
                                type="button"
                                onClick={toggleErrors}>
                                {
                                    open ?
                                        <HiChevronDown/>
                                        :
                                        <HiChevronRight/>
                                }
                            </button>
                        </div>
                        {
                            open && (
                                <>
                                    <div className={"error-container-subtitle"}><ErrorOutlineIcon sx={{paddingRight: "5px"}}/>Courses
                                        overlap:
                                    </div>
                                    <div className={"error-courses-container"}>
                                        {
                                            errors.overlap.courses.map((course) => {
                                                return (
                                                    <div className={"error-course"}>
                                                        <div className={"error-course-title"}>
                                                            {course.courseTitle}
                                                        </div>
                                                        {
                                                            !props.searchPage &&
                                                            (
                                                                <div className={"action-buttons"}>
                                                                    <button className="course-button" type="button"
                                                                            onClick={() => activeToTentative(course)}>
                                                                        <AddToTentativeButton />
                                                                    </button>
                                                                    <button
                                                                        className="course-button"
                                                                        type="button"
                                                                        onClick={() => conditionalRemoveCourse(course)}>
                                                                        <DeleteCourseButton />
                                                                    </button>
                                                                </div>
                                                            )
                                                        }

                                                        {/*<button type="button" onClick={onClick}><BiAddToQueue /></button>*/}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </>
                            )
                        }
                    </div>
                )
            }
        </>
    );
}
export default Errors