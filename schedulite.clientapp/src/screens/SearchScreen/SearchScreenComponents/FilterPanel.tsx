import React, {useContext, useEffect, useState} from "react";
import axiosConfig from "../../../api/axios-config";
import Results from "../../../components/CourseComponents/Results/Results";
import {useNavigate} from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";
import {Filters} from "../SearchPage";
import {UserContext, UserContextType} from "../../../context/UserContext";
import TextField from "@mui/material/TextField";

// import TextField from "@mui/material/TextField";
// import List from "./Components/List";
// import "./App.scss";

const FilterPanel = ({filters, onEnter} : {filters : Filters, onEnter : Function}) => {
    const { user } = useContext(UserContext) as UserContextType
    const navigate = useNavigate();
    const onBackClick = () => {
        navigate("/")
    }
    const handleKeyDown = (event : any, setFilter : Function) => {
        if (event.key === 'Enter') {
            setFilter(event.target.value)
            // 👇 Get input value
            onEnter();
        }
    };

    return (
        <div className={"side-panel left-panel"}>
            <div className={"side-panel-title"} >
                <button onClick={onBackClick} className={"back-button"}><HiChevronLeft /></button>
                Filter Page
            </div>
            <div className={"filters"}>
                <label htmlFor={"semester-filter"}>Semester: </label>
                <input className={"filter-input"} id="semester-filter"  value={filters.semester} disabled={user !== null}/><br/>
                {/*<label htmlFor={"name-filter"}>Last name: </label>*/}
                <TextField
                    id="outlined-basic"
                    value={filters.semester}
                    variant="outlined"
                    sx={{paddingBottom: "10px"}}
                    disabled={user !== null}
                    // disabled={user !== null}
                />
                <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    sx={{paddingBottom: "10px"}}
                    onBlur={(event) => filters.setNameFilter(event.target.value)}
                    onKeyDown={(event) => handleKeyDown(event, filters.setNameFilter)}
                    // disabled={user !== null}
                />
                <TextField
                    id="outlined-basic"
                    label="Start Time"
                    variant="outlined"
                    sx={{paddingBottom: "10px"}}
                    onBlur={(event) => filters.setTimeFilter(event.target.value)}
                    onKeyDown={(event) => handleKeyDown(event, filters.setTimeFilter)}
                    // disabled={user !== null}
                />
                <TextField
                    id="outlined-basic"
                    label="Days"
                    variant="outlined"
                    sx={{paddingBottom: "10px"}}
                    onBlur={(event) => filters.setDayFilter(event.target.value)}
                    onKeyDown={(event) => handleKeyDown(event, filters.setDayFilter)}
                    // disabled={user !== null}
                />
                {/*<label htmlFor={"name-filter"}>Last name: </label>*/}
                {/*<input className={"filter-input"} id="name-filter" placeholder={"Enter Last Name"} onBlur={(event) => filters.setNameFilter(event.target.value)}/><br/>*/}
                {/*<label htmlFor={"time-filter"}>Start Time: </label>*/}
                {/*<input className={"filter-input"} id="time-filter" placeholder={"Enter Time, e.g. 10:00"} onBlur={(event) => filters.setTimeFilter(event.target.value)}/><br/>*/}
                {/*<label htmlFor={"day-filter"}>Days: </label>*/}
                {/*<input className={"filter-input"} id="day-filter" placeholder={"Enter Days, e.g. MWF, or MW"} onBlur={(event) => filters.setDayFilter(event.target.value)}/><br/>*/}
            </div>
        </div>
    )
}
export default FilterPanel;