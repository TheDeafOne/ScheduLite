import React, {useEffect, useState} from "react";
import axiosConfig from "../../api/axios-config";
import Results from "./Results/Results";
import CourseCard from "./CourseCard";
import ICourse from "../../types/course.type";
import Errors from "../ScheduleIssues/Errors"
import Warnings from "../ScheduleIssues/Warnings"
import {hover} from "@testing-library/user-event/dist/hover";
// import TextField from "@mui/material/TextField";
// import List from "./Components/List";
// import "./App.scss";

const CourseDetailPanel = ({course, viewCourse, calendarCourseHover}: {course : ICourse | undefined, viewCourse: boolean, calendarCourseHover: ICourse | undefined}) => {

    return (
        <div className={"side-panel right-panel"}>
            <div>
                <div className={"side-panel-title"} >
                    Course Detail View
                </div>
                <br />
                <div>
                    {
                        viewCourse &&
                        (course ? <CourseCard course={calendarCourseHover ? calendarCourseHover : course} />
                                : (calendarCourseHover ? <CourseCard course={calendarCourseHover} /> : <></>)
                        )
                    }
                </div>
            </div>
            <div>
                <div className={"side-panel-title"} >
                    Issues
                </div>
                <div>
                    <Errors />
                    <Warnings />
                </div>
            </div>

        </div>
    )
}
export default CourseDetailPanel;