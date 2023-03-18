import React, {useEffect, useState} from 'react'
import axiosConfig from "../../api/axios-config";
import SearchPage from "../SearchScreen/SearchPage";
import SearchBar from "../SearchScreen/SearchBar";
import "../../styles/BodyStructure.css"
import CoursePanel from "./CoursePanel";
import ScheduleView from "./ScheduleView";

const Home = () => {
    const [response, setResponse] = useState("");
    // useEffect(() => {
    //     axiosConfig.get("/users/roles")
    //         .then(r => {
    //             console.log(r);
    //             // console.log(r.data[0].get("name"));
    //             setResponse(r.data.toString());
    //         });
    //
    // }, [])
    return (
        <div className={"main-body"}>
            <CoursePanel />
            <div className={"center-panel"}>
                <SearchBar />
                <ScheduleView />
            </div>
            <CoursePanel />
        </div>
    )
}
export default Home