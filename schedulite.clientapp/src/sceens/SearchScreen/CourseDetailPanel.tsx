import React, {useEffect, useState} from "react";
import axiosConfig from "../../api/axios-config";
import Results from "./Results";
// import TextField from "@mui/material/TextField";
// import List from "./Components/List";
// import "./App.css";

const CourseDetailPanel = (props : any) => {

    return (
        <div className={"side-panel"}>
            Course Detail View
            <br/>
            {props.data ? props.data.course_title : ""}
        </div>
    )
}
export default CourseDetailPanel;