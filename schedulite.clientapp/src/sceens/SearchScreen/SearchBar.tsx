import React, {useEffect, useState} from "react";
import axiosConfig from "../../api/axios-config";
import Results from "./Results";
// import TextField from "@mui/material/TextField";
// import List from "./Components/List";
// import "./App.css";

const SearchBar = (props : any) => {
    // const [response, setResponse] = useState(props.response);
    const [query, setQuery] = useState("")
    //
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

            props.setResponse([{id: "640fe2f84c63f508ebd1d2b4", name: "ROLE_USER"}, {id: "640fe2f84c63f508ebd1d2b5", name: "ROLE_MODERATOR"}, {id: "640fe2f84c63f508ebd1d2b6", name: "ROLE_ADMIN"}])
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
        <div>
            {/*FILTER PANEL*/}

            <input placeholder="Enter Post Title"
                   onChange={event => setQuery(event.target.value)}
                   onKeyDown={handleKeyDown}/>
            {/*DETAIL VIEW*/}
        </div>
    )
}
export default SearchBar;