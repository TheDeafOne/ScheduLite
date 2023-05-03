import React, {useEffect, useState} from "react";
import axiosConfig from "../../../../api/axios-config";
import Results from "../../../../components/CourseComponents/Results/Results";
// import TextField from "@mui/material/TextField";
// import List from "./Components/List";
import "./SearchBar.scss";
import SearchTypeDropdown from "../SearchTypeDropdown";

const SearchBar = (props : any) => {
    const [query, setQuery] = useState("")
    const onclick = () => {
        if (props.firstClick) {
            // setFirstClick(false)
            props.navigate()
        }
    }

    const handleKeyDown = (event : any) => {
        props.setQuery(event.target.value)
        props.onEnter();
    };
    return (
        <div className={"searchBar"}>
            {/*FILTER PANEL*/}
            <div className={"searchBarInputContainer"}>
                <input placeholder="Search Classes"
                       className={"searchBarInput"}
                       autoFocus={props.autofocus}
                       onChange={handleKeyDown}
                       // onKeyUp={handleKeyDown}
                       onClick={onclick}/>
            </div>

            {/*DETAIL VIEW*/}
        </div>
    )
}
export default SearchBar;