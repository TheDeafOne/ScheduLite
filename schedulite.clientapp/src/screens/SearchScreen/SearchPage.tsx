import React, {useEffect, useState} from "react";
import axiosConfig from "../../api/axios-config";
import Results from "../../components/CourseComponents/Results";
import SearchBar from "./SearchScreenComponents/SearchBar";
import CourseDetailPanel from "../../components/CourseComponents/CourseDetailPanel";
import FilterPanel from "./SearchScreenComponents/FilterPanel";
import "../../styles/BodyStructure.css"
import Course from "../../components/CourseComponents/Course";
import { motion } from "framer-motion";
import ICourse from "../../types/course.type";
import ISchedule from "../../types/schedule.type";
import moment from "moment";

const SearchPage = ({ schedule, setSchedule, addCourse, removeCourse } : { schedule : ISchedule, setSchedule : Function, addCourse: Function, removeCourse: Function }) => {
    const [response, setResponse] = useState(Array<ICourse>);
    const [query, setQuery] = useState("")
    const [currCourse, setCourse]= useState<ICourse>();
    const [searchType, setSearchType] = useState("Course Title")

    const [viewCourse, setViewCourse] = useState(false);
    const setSearchResponse = (newValue: any) => {
        setResponse(newValue);
    }
    const onCourseClick = (course : any) => {
        console.log(course);
        console.log(currCourse);
        if (course === currCourse) {
            setViewCourse(false);
            setCourse(Object);
        } else {
            setViewCourse(true);
            setCourse(course);
        }
    }
    // const active: ICourse[] = [{"id":"641463211d1ed0444011a19e","year":2018,"semester":"Fall","course_prefix":"BIOL","course_number":301,"course_section":"L","last_name":"Stauff","first_name":"Devin","course_title":"LABORATORY","credit_hours":0,"credit_variation":"N","course_capacity":9,"crs_enrollment":11,"building_code":"RO","room_code":"121","on_monday":null,"on_tuesday":"T","on_wednesday":null,"on_thursday":"R","on_friday":null,"start_time":"1/1/1900 11:30","end_time":"1/1/1900 12:45","preferred_name":null},{"id":"641463211d1ed0444011a19f","year":2018,"semester":"Fall","course_prefix":"BIOL","course_number":305,"course_section":"A","last_name":"Dudt","first_name":"Jan","course_title":"PLANT TAXONOMY","credit_hours":4,"credit_variation":"N","course_capacity":20,"crs_enrollment":12,"building_code":"STEM","room_code":"245","on_monday":"M","on_tuesday":null,"on_wednesday":"W","on_thursday":null,"on_friday":"F","start_time":"1/1/1900 10:00","end_time":"1/1/1900 10:50","preferred_name":null},{"id":"641463211d1ed0444011a1a0","year":2018,"semester":"Fall","course_prefix":"BIOL","course_number":305,"course_section":"L","last_name":"Dudt","first_name":"Jan","course_title":"LABORATORY","credit_hours":0,"credit_variation":"N","course_capacity":20,"crs_enrollment":12,"building_code":"STEM","room_code":"126","on_monday":null,"on_tuesday":null,"on_wednesday":"W","on_thursday":null,"on_friday":null,"start_time":"1/1/1900 14:00","end_time":"1/1/1900 16:59","preferred_name":null},{"id":"641463211d1ed0444011a1a1","year":2018,"semester":"Fall","course_prefix":"BIOL","course_number":313,"course_section":"A","last_name":"Farone","first_name":"Tracy","course_title":"HISTOLOGY","credit_hours":3,"credit_variation":"N","course_capacity":20,"crs_enrollment":20,"building_code":"STEM","room_code":"245","on_monday":null,"on_tuesday":"T","on_wednesday":null,"on_thursday":"R","on_friday":null,"start_time":"1/1/1900 13:00","end_time":"1/1/1900 14:15","preferred_name":null},{"id":"641463211d1ed0444011a1a2","year":2018,"semester":"Fall","course_prefix":"BIOL","course_number":331,"course_section":"A","last_name":"Brenner","first_name":"Frederic","course_title":"ECOLOGY","credit_hours":4,"credit_variation":"N","course_capacity":24,"crs_enrollment":7,"building_code":"RO","room_code":"218","on_monday":null,"on_tuesday":"T","on_wednesday":null,"on_thursday":"R","on_friday":null,"start_time":"1/1/1900 8:00","end_time":"1/1/1900 9:15","preferred_name":"Fred"}]
    const onEnter = (q : any) => {
        console.log("PRESSED ENTER")
        console.log(q);
        // setResponse(active)
        // setResponse([{id: "640fe2f84c63f508ebd1d2b4", name: "ROLE_USER"}, {id: "640fe2f84c63f508ebd1d2b5", name: "ROLE_MODERATOR"}, {id: "640fe2f84c63f508ebd1d2b6", name: "ROLE_ADMIN"}])
        /**
         * THIS IS WHERE WE ARE GOING TO MAKE A CALL TO THE DATABASE
         */
        // const active: ICourse[] = [{"id":"641463211d1ed0444011a19e","year":2018,"semester":"Fall","course_prefix":"BIOL","course_number":301,"course_section":"L","last_name":"Stauff","first_name":"Devin","course_title":"LABORATORY","credit_hours":0,"credit_variation":"N","course_capacity":9,"crs_enrollment":11,"building_code":"RO","room_code":"121","on_monday":null,"on_tuesday":"T","on_wednesday":null,"on_thursday":"R","on_friday":null,"start_time":"1/1/1900 11:30","end_time":"1/1/1900 12:45","preferred_name":null},{"id":"641463211d1ed0444011a19f","year":2018,"semester":"Fall","course_prefix":"BIOL","course_number":305,"course_section":"A","last_name":"Dudt","first_name":"Jan","course_title":"PLANT TAXONOMY","credit_hours":4,"credit_variation":"N","course_capacity":20,"crs_enrollment":12,"building_code":"STEM","room_code":"245","on_monday":"M","on_tuesday":null,"on_wednesday":"W","on_thursday":null,"on_friday":"F","start_time":"1/1/1900 10:00","end_time":"1/1/1900 10:50","preferred_name":null},{"id":"641463211d1ed0444011a1a0","year":2018,"semester":"Fall","course_prefix":"BIOL","course_number":305,"course_section":"L","last_name":"Dudt","first_name":"Jan","course_title":"LABORATORY","credit_hours":0,"credit_variation":"N","course_capacity":20,"crs_enrollment":12,"building_code":"STEM","room_code":"126","on_monday":null,"on_tuesday":null,"on_wednesday":"W","on_thursday":null,"on_friday":null,"start_time":"1/1/1900 14:00","end_time":"1/1/1900 16:59","preferred_name":null},{"id":"641463211d1ed0444011a1a1","year":2018,"semester":"Fall","course_prefix":"BIOL","course_number":313,"course_section":"A","last_name":"Farone","first_name":"Tracy","course_title":"HISTOLOGY","credit_hours":3,"credit_variation":"N","course_capacity":20,"crs_enrollment":20,"building_code":"STEM","room_code":"245","on_monday":null,"on_tuesday":"T","on_wednesday":null,"on_thursday":"R","on_friday":null,"start_time":"1/1/1900 13:00","end_time":"1/1/1900 14:15","preferred_name":null},{"id":"641463211d1ed0444011a1a2","year":2018,"semester":"Fall","course_prefix":"BIOL","course_number":331,"course_section":"A","last_name":"Brenner","first_name":"Frederic","course_title":"ECOLOGY","credit_hours":4,"credit_variation":"N","course_capacity":24,"crs_enrollment":7,"building_code":"RO","room_code":"218","on_monday":null,"on_tuesday":"T","on_wednesday":null,"on_thursday":"R","on_friday":null,"start_time":"1/1/1900 8:00","end_time":"1/1/1900 9:15","preferred_name":"Fred"}]
        // active.forEach(function(course : ICourse, index : number, array : Array<ICourse>) {
        //         array[index].converted_start_date = moment(course["start_time"], 'DD/MM/YYYY h:mm');
        //         array[index].converted_end_date = moment(course["end_time"], 'DD/MM/YYYY h:mm');
        //     })
        // console.log(active)
        // setResponse(active)
        console.log(searchType);
        let url = ""
        if (searchType === "Course Code") {
            let params = q.split(" ")
            url = `/courses/filters?prefix=${params[0]}&number=${params[1]}`
        } else if (searchType === "Course Title") {
            url = `/courses/filters?title=${q}`
        }
        console.log(url)
        axiosConfig.get(url)
            .then(r => {
                setResponse(r.data);
                r.data.forEach(function(course : ICourse, index : number, array : Array<ICourse>) {
                    array[index].converted_start_date = moment(course["start_time"], 'DD/MM/YYYY h:mm');
                    array[index].converted_end_date = moment(course["end_time"], 'DD/MM/YYYY h:mm');
                })
                console.log(`r = ${r}`)
                }
            )
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

            // setResponse(active)
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
        <div className={"background"}>
        <motion.div
            key="search"
            className="container text-center"
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
        >
            <div className={"main-body"}>
                {/*FILTER PANEL*/}
                <FilterPanel />
                <div className={"center-panel"}>
                    <motion.div
                        key="search"
                        className="container text-center"
                    //     transformOrigin: "top center",
                    // transformOrigin: "top center",
                        initial={{scale: .97 }}
                        animate={{scale: 1 }}
                        // exit={{ opacity: 0 }}
                        transition={{ duration: .75 }}
                    >
                    <SearchBar
                        setResponse={setSearchResponse}
                        onEnter={onEnter}
                        autofocus={true}
                        firstClick={false}
                        searchType={searchType}
                        setSearchType={setSearchType}
                    />
                    </motion.div>
                    <Results response={response}
                             onCourseClick={onCourseClick}
                             addCourse={addCourse}
                             removeCourse={removeCourse}
                             sched={schedule}/>
                </div>
                <CourseDetailPanel course={currCourse}/>
                {/*DETAIL VIEW*/}
            </div>
        </motion.div>
    </div>
)
}
// import TextField from "@mui/material/TextField";
// import List from "./Components/List";
// import "./App.css";

export default SearchPage;
