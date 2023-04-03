import React, {useEffect, useState} from "react";
import axiosConfig from "../../api/axios-config";
import Results from "./Results";
import CourseCard from "./CourseCard";
import ICourse from "../../types/course.type";
// import TextField from "@mui/material/TextField";
// import List from "./Components/List";
// import "./App.css";

const CourseDetailPanel = ({course, viewCourse}: {course : ICourse | undefined, viewCourse: boolean}) => {

    return (
        <div className={"side-panel right-panel"}>
            <div className={"side-panel-title"} >
                Course Detail View
            </div>
            <br/>
            {
                viewCourse && course && <CourseCard course={course} />
            }
        </div>
    )
}
export default CourseDetailPanel;