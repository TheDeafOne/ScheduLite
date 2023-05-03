import React, {useContext, useEffect, useState} from "react";
import axiosConfig from "../../../api/axios-config";
import Results from "../../../components/CourseComponents/Results/Results";
import {useNavigate} from "react-router-dom";
// import { HiChevronLeft } from "react-icons/hi";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {UserContext, UserContextType} from "../../../context/UserContext";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";

const FilterPanel = ({filters, onEnter} : {filters : any, onEnter : Function}) => {

    const navigate = useNavigate();
    const onBackClick = () => {
        navigate("/")
    }
    const handleKeyDown = (event: any, setFilter: any) => {
        console.log(event)
        setFilter(event.target.value);
        if (event.key === 'Enter') {
            onEnter();
        }
    };


    return (
        <div className={"side-panel left-panel"}>
            <button onClick={onBackClick} className={"back-button"}><ArrowBackIcon /></button>
            <div className={""}>
                Back to Schedule
            </div>
            <div className={"filters"}>
                {filters.map((filterInfo: any) => {
                    
                    return (
                        <TextField 
                        key={filterInfo.name} 
                        variant="outlined"
                        sx={{paddingBottom:"10px"}}
                        select={filterInfo.type === "selection"}
                        size="small"
                        onKeyDown={(event) => handleKeyDown(event, filterInfo.setFilter)}
                        value={filterInfo.value}
                        label={filterInfo.name}
                        className="filter-input"
                        >
                        {filterInfo.type === "text" ? filterInfo.name :
                        filterInfo.options.map((option: any) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                        </TextField>
                    )
                })}
                
                {/* <label htmlFor={"name-filter"}>Last name: </label>
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
                /> */}
            </div>
        </div>
    )
}
export default FilterPanel;