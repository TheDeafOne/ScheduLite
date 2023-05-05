import { motion } from "framer-motion";
import moment from "moment";
import { useContext, useState } from "react";
import axiosConfig from "../../api/axios-config";
import CourseDetailPanel from "../../components/CourseComponents/CourseDetailPanel";
import Results from "../../components/CourseComponents/Results/Results";
import { ScheduleContext, ScheduleContextType } from "../../context/ScheduleContext";
import ICourse from "../../types/course.type";
import "./SearchPage.scss";
import FilterPanel from "./SearchScreenComponents/FilterPanel";
import SearchBar from "./SearchScreenComponents/SearchBar/SearchBar";


export interface Filters {
    nameFilter: string,
    setNameFilter: Function,
    timeFilter: string,
    setTimeFilter: Function,
    dayFilter: string,
    setDayFilter: Function,
    semesterFilter: string,
    setSemesterFilter: Function
}
const SearchPage = ({ linkedSchedule }: { linkedSchedule: boolean }) => {
    const [response, setResponse] = useState(Array<ICourse>);
    const [query, setQuery] = useState("")
    const [currCourse, setCourse] = useState<ICourse | undefined>();
    const [searchType, setSearchType] = useState("Course Title")
    const [viewCourse, setViewCourse] = useState(false);

    const { semester } = useContext(ScheduleContext) as ScheduleContextType
    // filters
    const [nameFilter, setNameFilter] = useState("")
    const [timeFilter, setTimeFilter] = useState("")
    const [dayFilter, setDayFilter] = useState("")
    console.log(`SEMESTER = ${semester}`)
    const [semesterFilter, setSemesterFilter] = useState(semester)

    let filters = {
        nameFilter, setNameFilter, timeFilter, setTimeFilter, dayFilter, setDayFilter, semesterFilter, setSemesterFilter
    }


    const setSearchResponse = (newValue: any) => {
        setResponse(newValue);
    }
    const onCourseClick = (course: any) => {
        console.log(course);
        console.log(currCourse);
        if (course === currCourse) {
            setViewCourse(false);
            setCourse(undefined);
        } else {
            setViewCourse(true);
            setCourse(course);
        }
    }
    // const active: ICourse[] = [{"id":"641463211d1ed0444011a19e","year":2018,"semester":"Fall","course_prefix":"BIOL","course_number":301,"course_section":"L","last_name":"Stauff","first_name":"Devin","course_title":"LABORATORY","credit_hours":0,"credit_variation":"N","course_capacity":9,"crs_enrollment":11,"building_code":"RO","room_code":"121","on_monday":null,"on_tuesday":"T","on_wednesday":null,"on_thursday":"R","on_friday":null,"start_time":"1/1/1900 11:30","end_time":"1/1/1900 12:45","preferred_name":null},{"id":"641463211d1ed0444011a19f","year":2018,"semester":"Fall","course_prefix":"BIOL","course_number":305,"course_section":"A","last_name":"Dudt","first_name":"Jan","course_title":"PLANT TAXONOMY","credit_hours":4,"credit_variation":"N","course_capacity":20,"crs_enrollment":12,"building_code":"STEM","room_code":"245","on_monday":"M","on_tuesday":null,"on_wednesday":"W","on_thursday":null,"on_friday":"F","start_time":"1/1/1900 10:00","end_time":"1/1/1900 10:50","preferred_name":null},{"id":"641463211d1ed0444011a1a0","year":2018,"semester":"Fall","course_prefix":"BIOL","course_number":305,"course_section":"L","last_name":"Dudt","first_name":"Jan","course_title":"LABORATORY","credit_hours":0,"credit_variation":"N","course_capacity":20,"crs_enrollment":12,"building_code":"STEM","room_code":"126","on_monday":null,"on_tuesday":null,"on_wednesday":"W","on_thursday":null,"on_friday":null,"start_time":"1/1/1900 14:00","end_time":"1/1/1900 16:59","preferred_name":null},{"id":"641463211d1ed0444011a1a1","year":2018,"semester":"Fall","course_prefix":"BIOL","course_number":313,"course_section":"A","last_name":"Farone","first_name":"Tracy","course_title":"HISTOLOGY","credit_hours":3,"credit_variation":"N","course_capacity":20,"crs_enrollment":20,"building_code":"STEM","room_code":"245","on_monday":null,"on_tuesday":"T","on_wednesday":null,"on_thursday":"R","on_friday":null,"start_time":"1/1/1900 13:00","end_time":"1/1/1900 14:15","preferred_name":null},{"id":"641463211d1ed0444011a1a2","year":2018,"semester":"Fall","course_prefix":"BIOL","course_number":331,"course_section":"A","last_name":"Brenner","first_name":"Frederic","course_title":"ECOLOGY","credit_hours":4,"credit_variation":"N","course_capacity":24,"crs_enrollment":7,"building_code":"RO","room_code":"218","on_monday":null,"on_tuesday":"T","on_wednesday":null,"on_thursday":"R","on_friday":null,"start_time":"1/1/1900 8:00","end_time":"1/1/1900 9:15","preferred_name":"Fred"}]
    const onEnter = (searchQuery: any) => {
        if (searchQuery === "") {
            setResponse([])
            return
        }
        // console.log("PRESSED ENTER")
        // console.log(q);
        // console.log(filters);
        // console.log(searchType);
        console.log("QUERY")
        console.log(searchQuery)
        let q = searchQuery;
        // setResponse([])
        let url = ""
        // if (semester === "") {
        // setSemesterFilter("Set semester when creating schedule!")
        // }
        let filterParams = `semester=${semester}&name=${nameFilter}&time=${timeFilter}&days=${dayFilter}`
        if (searchType === "Course Code") {
            let params = q.split(" ")
            console.log(params)
            let prefix = params[0]
            let number = params[1] ? params[1] : ""
            url = `/courses/filters?prefix=${prefix}&number=${number}&${filterParams}`
        } else if (searchType === "Course Title") {
            url = `/courses/filters?title=${q}&${filterParams}`
        }
        console.log(url)
        axiosConfig.get(url)
            .then(r => {
                let data = r.data.splice(0, 20)
                data.forEach(function (course: ICourse, index: number, array: Array<ICourse>) {
                    array[index].convertedStartDate = moment(course["startTime"], 'YYYY/MM/DD h:mm:ss');
                    array[index].convertedEndDate = moment(course["endTime"], 'YYYY/MM/DD h:mm:ss');
                    console.log(course)
                    // console.log(moment(course["startTime"], 'DD/MM/YYYY h:mm:ss'));
                    // console.log(moment(course["endTime"], 'DD/MM/YYYY h:mm:ss'));
                })
                setResponse(data);
                // console.log(`r = ${JSON.stringify(r)}`)
            }
            )
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
                    <FilterPanel filters={filters} onEnter={onEnter} />
                    <div className={"center-panel"}>
                        <motion.div
                            key="search"
                            className="container text-center"
                            //     transformOrigin: "top center",
                            // transformOrigin: "top center",
                            initial={{ scale: .97 }}
                            animate={{ scale: 1 }}
                            // exit={{ opacity: 0 }}
                            transition={{ duration: .75 }}
                        >
                            <SearchBar
                                setResponse={setSearchResponse}
                                onEnter={onEnter}
                                setQuery={setQuery}
                                autofocus={true}
                                firstClick={false}
                                searchType={searchType}
                                setSearchType={setSearchType}
                            />
                        </motion.div>
                        <Results response={response}
                            onCourseClick={onCourseClick}
                        // addCourse={addCourse}
                        // removeCourse={removeCourse}
                        // sched={schedule}
                        />
                    </div>
                    <CourseDetailPanel course={currCourse} viewCourse={viewCourse} calendarCourseHover={undefined} />
                    {/*DETAIL VIEW*/}
                </div>
            </motion.div>
        </div>
    )
}
// import TextField from "@mui/material/TextField";
// import List from "./Components/List";
// import "./App.scss";

export default SearchPage;
