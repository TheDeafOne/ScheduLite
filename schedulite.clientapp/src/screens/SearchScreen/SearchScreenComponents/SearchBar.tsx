import React, {useEffect, useState} from "react";
import axiosConfig from "../../../api/axios-config";
import Results from "../../../components/CourseComponents/Results";
// import TextField from "@mui/material/TextField";
// import List from "./Components/List";
import "../../../styles/SearchBar.css";
import SearchTypeDropdown from "./SearchTypeDropdown";

const SearchBar = (props : any) => {
    // const [response, setResponse] = useState(props.response);
    const [query, setQuery] = useState("")
    // const [firstClick, setFirstClick] = useState(true)
    // useEffect(() => {
    //     axiosConfig.get("/users/roles")
    //         .then(r => {
    //             setResponse(r.data);
    //             console.log((r.data));
    //         })
    // }, []);
    const onclick = () => {
        if (props.firstClick) {
            // setFirstClick(false)
            props.navigate()
        }
    }

    const handleKeyDown = (event : any) => {
        if (event.key === 'Enter') {
            // 👇 Get input value
            props.onEnter(query);

            // props.setResponse([{id: "640fe2f84c63f508ebd1d2b4", name: "ROLE_USER"}, {id: "640fe2f84c63f508ebd1d2b5", name: "ROLE_MODERATOR"}, {id: "640fe2f84c63f508ebd1d2b6", name: "ROLE_ADMIN"}])
            /**
             * THIS IS WHERE WE ARE GOING TO MAKE A CALL TO THE DATABASE
             */
            // axiosConfig.get("/courses")
            //     .then(r => {
            //         setResponse(r.data);
            //         console.log((r.data));
            //     })
        }
    };
    return (
        <div className={"searchBar"}>
            {/*FILTER PANEL*/}
            <div className={"searchBarInputContainer"}>
                {
                    props.firstClick ?
                        null
                        :
                        <SearchTypeDropdown searchType={props.searchType} setSearchType={props.setSearchType}/>
                }
                <input placeholder="Search Classes"
                       className={"searchBarInput"}
                       autoFocus={props.autofocus}
                       onChange={event => setQuery(event.target.value)}
                       onKeyDown={handleKeyDown}
                       onClick={onclick}/>
            </div>

            {/*DETAIL VIEW*/}
        </div>
    )
}
export default SearchBar;