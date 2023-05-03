import React, { useContext, useEffect, useState } from "react";
import axiosConfig from "../../api/axios-config";
import Results from "../../components/CourseComponents/Results/Results";
import SearchBar from "./SearchScreenComponents/SearchBar/SearchBar";
import CourseDetailPanel from "../../components/CourseComponents/CourseDetailPanel";
import FilterPanel from "./SearchScreenComponents/FilterPanel";
import "./SearchPage.scss";
import Course from "../../components/CourseComponents/Course";
import { color, motion } from "framer-motion";
import ICourse from "../../types/course.type";
import ISchedule from "../../types/schedule.type";
import moment from "moment";
import { ScheduleContext, ScheduleContextType } from "../../context/ScheduleContext";
import { UserContext, UserContextType } from "../../context/UserContext";


const SearchPage = ({ linkedSchedule }: { linkedSchedule: boolean }) => {
    const [response, setResponse] = useState(Array<ICourse>);
    const [query, setQuery] = useState("")
    const [currCourse, setCourse] = useState<ICourse | undefined>();
    const [searchType, setSearchType] = useState("Course Title")
    const [viewCourse, setViewCourse] = useState(false);
    const { user } = useContext(UserContext) as UserContextType


    const { activeCourses, setActiveCourses, tentativeCourses, setTentativeCourses, semester, year } = useContext(ScheduleContext) as ScheduleContextType
    // filters
    const [courseTitleFilter, setCourseTitleFilter] = useState("")
    const [coursePrefixFilter, setCoursePrefixFilter] = useState("")
    const [courseCodeFilter, setCourseCodeFilter] = useState("")
    const [courseTimeFilter, setCourseTimeFilter] = useState("")
    const [firstNameFilter, setFirstNameFilter] = useState("")
    const [lastNameFilter, setLastNameFilter] = useState("")
    const [daysFilter, setDaysFilter] = useState("")
    const [yearFilter, setYearFilter] = useState(year)
    const [semesterFilter, setSemesterFilter] = useState(semester)

    let filters = [
        { name: "year", paramName: "year", type: "selection", value: yearFilter, setFilter: setYearFilter, options: ["2018", "2019", "2020", "2021"] },
        { name: "semester", paramName: "semester", type: "selection", value: semesterFilter, setFilter: setSemesterFilter, options: ["spring", "fall"] },
        { name: "course prefix", paramName: "coursePrefix", type: "text", value: coursePrefixFilter, setFilter: setCoursePrefixFilter },
        { name: "course code", paramName: "courseNumber", type: "text", value: courseCodeFilter, setFilter: setCourseCodeFilter },
        { name: "course title", paramName: "courseTitle", type: "text", value: courseTitleFilter, setFilter: setCourseTitleFilter },
        { name: "course time", paramName: "courseTime", type: "text", value: courseTimeFilter, setFilter: setCourseTimeFilter },
        { name: "first name", paramName: "firstName", type: "text", value: firstNameFilter, setFilter: setFirstNameFilter },
        { name: "last name", paramName: "lastName", type: "text", value: lastNameFilter, setFilter: setLastNameFilter },
        { name: "days", paramName: "days", type: "text", value: daysFilter, setFilter: setDaysFilter },
    ]

    const setSearchResponse = (newValue: any) => {
        setResponse(newValue);
    }
    const onCourseClick = (course: any) => {
        if (course === currCourse) {
            setViewCourse(false);
            setCourse(undefined);
        } else {
            setViewCourse(true);
            setCourse(course);
        }
    }

    const onEnter = () => {
        let baseApiEnpoint = "/courses";
        let filterParams = filters.map((filter) => {
            if (filter.value !== "") {
                return `${filter.paramName}=${filter.value}`
            }
        }).filter((item) => {return item !== undefined})
        if (query != "") {
            filterParams.push(`query=${query}`)
        }
        let stringifiedFilterParams = filterParams.join('&');

        let url = baseApiEnpoint;
        if (filterParams.length > 0 || query != "") {
            url += `/query?${stringifiedFilterParams}`; 
        }
       
        console.log(url);

        axiosConfig.get(url)
            .then(r => {
                let data = r.data.splice(0,20)
                data.forEach(function(course : ICourse, index : number, array : Array<ICourse>) {
                    array[index].convertedStartDate = moment(course["startTime"], 'YYYY/MM/DD h:mm:ss');
                    array[index].convertedEndDate = moment(course["endTime"], 'YYYY/MM/DD h:mm:ss');
                    
                })
                setResponse(data);
                }
            )
    };



    return (
        <div className={"background"}>
            <motion.div
                key="search"
                className="container text-center"
                transition={{ duration: 3 }}
            >
                <div className={"main-body"}>
                    <FilterPanel filters={filters} onEnter={onEnter} />
                    <div className={"center-panel"}>
                        <motion.div
                            key="search"
                            className="container text-center"
                            initial={{ scale: .97 }}
                            animate={{ scale: 1 }}
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
                        <Results response={response} onCourseClick={onCourseClick} />
                    </div>
                    <CourseDetailPanel course={currCourse} viewCourse={viewCourse} calendarCourseHover={undefined} />
                </div>
            </motion.div>
        </div>
    )
}
export default SearchPage;
