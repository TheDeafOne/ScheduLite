import { motion } from "framer-motion";
import moment from "moment";
import { useContext, useState, useEffect, useRef } from "react";
import axiosConfig from "../../api/axios-config";
import CourseDetailPanel from "../../components/CourseComponents/CourseDetailPanel";
import Results from "../../components/CourseComponents/Results/Results";
import { ScheduleContext, ScheduleContextType } from "../../context/ScheduleContext";
import { UserContext, UserContextType } from "../../context/UserContext";
import ICourse from "../../types/course.type";
import "./SearchPage.scss";
import FilterPanel from "./SearchScreenComponents/FilterPanel";
import SearchBar from "./SearchScreenComponents/SearchBar/SearchBar";
import "./SearchPage.scss";
import Course from "../../components/CourseComponents/Course";
import {color, motion} from "framer-motion";
import ISchedule from "../../types/schedule.type";
import moment from "moment";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";



const SearchPage = ({ linkedSchedule }: { linkedSchedule: boolean }) => {
    const [response, setResponse] = useState(Array<ICourse>);
    const [query, setQuery] = useState("")
    const [currCourse, setCourse] = useState<ICourse | undefined>();
    const [searchType, setSearchType] = useState("Course Title")
    const [viewCourse, setViewCourse] = useState(false);
    const [matched, setMatched] = useState(false);
    const { user } = useContext(UserContext) as UserContextType
    const [url, setUrl] = useState("/courses");

    const { semester, year } = useContext(ScheduleContext) as ScheduleContextType

    let filterSet = [
        { name: "Year", paramName: "year", type: "selection", value: year, options: [{label: "2018",value:"2018"}, {label: "2019",value:"2019"}, {label: "2020",value:"2020"}, {label: "all", value:""}], disabled:(year!=="") },
        { name: "Semester", paramName: "semester", type: "selection", value: semester, options: [{label: "Spring", value: "Spring"}, {label: "Fall", value: "Fall"}, {label: "All", value:""}],disabled:(semester!=="") },
        { name: "Course Prefix", paramName: "coursePrefix", type: "text", value: "" },
        { name: "Course Code", paramName: "courseNumber", type: "text", value: "" },
        { name: "Course Title", paramName: "courseTitle", type: "text", value: "" },
        { name: "Course Time", paramName: "courseTime", type: "text", value: "" },
        { name: "First Name", paramName: "firstName", type: "text", value: "" },
        { name: "Last Name", paramName: "lastName", type: "text", value: "" },
        { name: "Days", paramName: "days", type: "text", value: "" },
    ]

    const [filters, setFilters] = useState(filterSet)
    const [waittime, setWaittime] = useState(500);


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

    const initialRender = useRef(false);
    useEffect(() => {
        console.log(url);
        const getData = setTimeout(() => {
            axiosConfig.get(url)
                .then(r => {
                    let data = r.data.splice(0, 20)
                    data.forEach(function (course: ICourse, index: number, array: Array<ICourse>) {
                        array[index].convertedStartDate = moment(course["startTime"], 'YYYY/MM/DD h:mm:ss');
                        array[index].convertedEndDate = moment(course["endTime"], 'YYYY/MM/DD h:mm:ss');

                    })
                    const firstCourse = data[0]
                    setResponse(data);
                }
            )
        },waittime)
        return () => clearTimeout(getData)
    }, [url])

    const onEnter = (searchQuery: string) => {
        let baseApiEnpoint = "/courses";

        let filterParams = filters.map((filter) => {
            if (filter.value !== "") {
                return `${filter.paramName}=${filter.value}`
            }
        }).filter((item) => { return item !== undefined })

        if (searchQuery === undefined && query == "") {
            setWaittime(0);
        } else {
            if (searchQuery !== undefined) {
                setQuery(searchQuery);
            }
            let pushQuery = searchQuery === undefined ? query : searchQuery
            if (pushQuery !== "" && pushQuery !== undefined) {
                setWaittime(500);
                filterParams.push(`query=${pushQuery}`)
            }
        }

        let stringifiedFilterParams = filterParams.join('&');

        let newUrl = baseApiEnpoint;
        if (filterParams.length > 0 || (searchQuery !== "" && searchQuery !== undefined)) {
            newUrl += `/query?${stringifiedFilterParams}`;
        }

        setUrl(newUrl);
    };



    return (
        <div className={"background"}>
            <motion.div
                key="search"
                className="container text-center"
                transition={{ duration: 3 }}
            >
                <div className={"main-body"}>
                    <FilterPanel filters={filters} setFilters={setFilters} onEnter={onEnter} />
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
                                query={query}
                                autofocus={true}
                                firstClick={false}
                                searchType={searchType}
                                setSearchType={setSearchType}
                            />
                        </motion.div>
                        {matched ?? "No course matched your"}
                        <Results response={response} onCourseClick={onCourseClick} />
                    </div>
                    <CourseDetailPanel course={currCourse} viewCourse={viewCourse} calendarCourseHover={undefined} />
                </div>
            </motion.div>
        </div>
    )
}
export default SearchPage;
