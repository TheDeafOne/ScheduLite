import React, {useEffect, useState} from "react";
import axiosConfig from "../../api/axios-config";
import Results from "./Results";
import SearchBar from "./SearchBar";
import CourseDetailPanel from "./CourseDetailPanel";
import FilterPanel from "./FilterPanel";
import "../../styles/BodyStructure.css"
// import TextField from "@mui/material/TextField";
// import List from "./Components/List";
// import "./App.css";

const SearchPage = () => {
    const [response, setResponse] = useState([{}]);
    const [query, setQuery] = useState("")

    const setSearchResponse = () => {

    }
    // useEffect(() => {
    //     axiosConfig.get("/users/roles")
    //         .then(r => {
    //             setResponse(r.data);
    //             console.log((r.data));
    //         })
    // }, []);
    const handleKeyDown = (event : any) => {
        if (event.key === 'Enter') {
            // 👇 Get input value
            console.log("PRESSED ENTER")
            console.log(query);

            setResponse([{id: "640fe2f84c63f508ebd1d2b4", name: "ROLE_USER"}, {id: "640fe2f84c63f508ebd1d2b5", name: "ROLE_MODERATOR"}, {id: "640fe2f84c63f508ebd1d2b6", name: "ROLE_ADMIN"}])
            /**
             * THIS IS WHERE WE ARE GOING TO MAKE A CALL TO THE DATABASE
             */
            // axiosConfig.get("/users/roles")
            //     .then(r => {
            //         setResponse(r.data);
            //         console.log((r.data));
            //     })
        }
    };

    return (
    <div className={"main-body"}>
        {/*FILTER PANEL*/}
        <FilterPanel />
        <div className={"center-panel"}>
            <SearchBar setResponse={() => setResponse}/>
            <Results response={response} />
        </div>
        <CourseDetailPanel />
        {/*DETAIL VIEW*/}
    </div>
    )
}

export default SearchPage;