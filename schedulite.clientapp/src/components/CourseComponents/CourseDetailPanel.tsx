import { useContext } from "react";
import { ScheduleContext, ScheduleContextType } from "../../context/ScheduleContext";
import ICourse from "../../types/course.type";
import Errors from "../ScheduleIssues/Errors";
import Warnings from "../ScheduleIssues/Warnings";
import CourseCard from "./CourseCard";
// import TextField from "@mui/material/TextField";
// import List from "./Components/List";
// import "./App.scss";

const CourseDetailPanel = ({ course, viewCourse, calendarCourseHover, searchPage }: { course: ICourse | undefined, viewCourse: boolean, calendarCourseHover: ICourse | undefined, searchPage: boolean }) => {
    const { errors, warnings } = useContext(ScheduleContext) as ScheduleContextType
    // const issuesExist = () => {
    //     let warning = warnings()
    //     let error = errors()
    //     return warning.credits.value && warning.sameCourse.value && error.overlap.value
    // }
    return (
        <div className={"side-panel right-panel"}>
            <div className={"details"}>
                <div>
                    <div className={"side-panel-title-container"}>
                        <div className={"side-panel-title"}>
                            Course Detail View
                        </div>
                    </div>
                    <div className={"course-detail-card"}>
                        {
                            viewCourse &&
                            (course ? <CourseCard course={calendarCourseHover ? calendarCourseHover : course} />
                                : (calendarCourseHover ? <CourseCard course={calendarCourseHover} /> : <></>)
                            )
                        }
                    </div>

                </div>
                {(errors.overlap.value || warnings.sameCourse.value || warnings.credits.value) && (
                    <div>
                        <div className={"side-panel-title"}>
                            Issues
                        </div>
                    </div>
                )}


                {/*{*/}
                {/*    issuesExist() && (*/}
                {/*        <div>*/}
                {/*            <div className={"side-panel-title"}>*/}
                {/*                Issues*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    )*/}
                {/*}*/}

            </div>
            {(errors.overlap.value || warnings.sameCourse.value || warnings.credits.value) && (
                <div className={"issues"}>

                    <div className={"issues-container"}>
                        <Errors searchPage={searchPage}/>
                        <Warnings searchPage={searchPage}/>
                    </div>
                </div>
            )}
        </div>
    );
}
export default CourseDetailPanel;