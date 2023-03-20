import React, {useEffect, useState} from "react";
import axiosConfig from "../../api/axios-config";
import Results from "./Results";
import SearchBar from "./SearchBar";
import CourseDetailPanel from "./CourseDetailPanel";
import FilterPanel from "./FilterPanel";
import "../../styles/BodyStructure.css"
import Course from "./Course";
// import TextField from "@mui/material/TextField";
// import List from "./Components/List";
// import "./App.css";

const SearchPage = () => {
    const [response, setResponse] = useState([{}]);
    const [query, setQuery] = useState("")
    const [currCourse, setCourse]= useState({});
    const [viewCourse, setViewCourse] = useState(false);
    const setSearchResponse = (newValue: any) => {
        setResponse(newValue);
    }
    const onCourseClick = (course : any) => {
        console.log(course);
        console.log(currCourse);
        if (course === currCourse) {
            setViewCourse(false);
            setCourse({});
        } else {
            setViewCourse(true);
            setCourse(course);
        }
    }
    const onEnter = (q : any) => {
        console.log("PRESSED ENTER")
        console.log(q);
        // setResponse([{id: "640fe2f84c63f508ebd1d2b4", name: "ROLE_USER"}, {id: "640fe2f84c63f508ebd1d2b5", name: "ROLE_MODERATOR"}, {id: "640fe2f84c63f508ebd1d2b6", name: "ROLE_ADMIN"}])
            /**
             * THIS IS WHERE WE ARE GOING TO MAKE A CALL TO THE DATABASE
             */
            axiosConfig.get("/courses")
                .then(r => {
                    setResponse(r.data);
                    console.log((r.data));
                })
    };
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

            // setResponse([{id: "640fe2f84c63f508ebd1d2b4", name: "ROLE_USER"}, {id: "640fe2f84c63f508ebd1d2b5", name: "ROLE_MODERATOR"}, {id: "640fe2f84c63f508ebd1d2b6", name: "ROLE_ADMIN"}])
            /**
             * THIS IS WHERE WE ARE GOING TO MAKE A CALL TO THE DATABASE
             */
            axiosConfig.get("/courses")
                .then(r => {
                    setResponse(r.data);
                    console.log((r.data));
                })
        }
    };

    return (
    <div className={"main-body"}>
        {/*FILTER PANEL*/}
        <FilterPanel />
        <div className={"center-panel"}>
            <SearchBar setResponse={setSearchResponse} onEnter={onEnter}/>
            <Results response={response} onCourseClick={onCourseClick}/>
        </div>
        <CourseDetailPanel data={currCourse}/>
        {/*DETAIL VIEW*/}
    </div>
    )
}

export default SearchPage;