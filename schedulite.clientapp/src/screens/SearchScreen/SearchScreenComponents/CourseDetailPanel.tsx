import React, {useEffect, useState} from "react";
import axiosConfig from "../../../api/axios-config";
import Results from "../../../components/Results";
// import TextField from "@mui/material/TextField";
// import List from "./Components/List";
// import "./App.css";

const CourseDetailPanel = (props : any) => {

    return (
        <div className={"side-panel"}>
            <div className={"side-panel-title"} >
                Course Detail View
            </div>
            <br/>
            {props.data ? props.data.course_title : ""}
        </div>
    )
}
export default CourseDetailPanel;