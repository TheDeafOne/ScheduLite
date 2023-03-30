import React, {useEffect, useState} from "react";
import axiosConfig from "../../../api/axios-config";
import Results from "../../../components/Results";
import CourseCard from "../../../components/CourseCard";
import ICourse from "../../../types/course.type";
// import TextField from "@mui/material/TextField";
// import List from "./Components/List";
// import "./App.css";

const CourseDetailPanel = ({course}: {course : ICourse | undefined}) => {

    return (
        <div className={"side-panel"}>
            <div className={"side-panel-title"} >
                Course Detail View
            </div>
            <br/>
            {course ? <CourseCard course={course} />: ""}
        </div>
    )
}
export default CourseDetailPanel;