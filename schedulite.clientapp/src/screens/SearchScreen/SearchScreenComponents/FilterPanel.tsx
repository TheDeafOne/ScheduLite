import React, {useEffect, useState} from "react";
import axiosConfig from "../../../api/axios-config";
import Results from "../../../components/CourseComponents/Results";
import {useNavigate} from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";
import {Filters} from "../SearchPage";

// import TextField from "@mui/material/TextField";
// import List from "./Components/List";
// import "./App.css";

const FilterPanel = ({filters} : {filters : Filters}) => {
    const navigate = useNavigate();
    const onBackClick = () => {
        navigate("/")
    }
    return (
        <div className={"side-panel left-panel"}>
            <div className={"side-panel-title"} >
                <button onClick={onBackClick} className={"back-button"}><HiChevronLeft /></button>
                Filter Page
            </div>
            <div className={"filters"}>
                <label htmlFor={"semester-filter"}>Semester: </label>
                <input className={"filter-input"} id="semester-filter" value={filters.semester} disabled={true}/><br/>
                <label htmlFor={"name-filter"}>Last name: </label>
                <input className={"filter-input"} id="name-filter" onBlur={(event) => filters.setNameFilter(event.target.value)}/><br/>
                <label htmlFor={"time-filter"}>Start Time: </label>
                <input className={"filter-input"} id="time-filter" onBlur={(event) => filters.setTimeFilter(event.target.value)}/><br/>
                <label htmlFor={"day-filter"}>Days: </label>
                <input className={"filter-input"} id="day-filter" onBlur={(event) => filters.setDayFilter(event.target.value)}/><br/>

            </div>
        </div>
    )
}
export default FilterPanel;