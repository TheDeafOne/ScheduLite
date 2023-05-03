import { motion } from "framer-motion";
import moment from "moment";
import { useContext, useState } from "react";
import axiosConfig from "../../api/axios-config";
import CourseDetailPanel from "../../components/CourseComponents/CourseDetailPanel";
import Results from "../../components/CourseComponents/Results/Results";
import { ScheduleContext, ScheduleContextType } from "../../context/ScheduleContext";
import { UserContext, UserContextType } from "../../context/UserContext";
import ICourse from "../../types/course.type";
import "./SearchPage.scss";
import FilterPanel from "./SearchScreenComponents/FilterPanel";
import SearchBar from "./SearchScreenComponents/SearchBar/SearchBar";


const SearchPage = ({ linkedSchedule }: { linkedSchedule: boolean }) => {
    const [response, setResponse] = useState(Array<ICourse>);
    const [query, setQuery] = useState("")
    const [currCourse, setCourse] = useState<ICourse | undefined>();
    const [searchType, setSearchType] = useState("Course Title")
    const [viewCourse, setViewCourse] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext) as UserContextType


    const { semester, year } = useContext(ScheduleContext) as ScheduleContextType

    let filterSet = [
        { name: "year", paramName: "year", type: "selection", value: year, options: ["2018", "2019", "2020"] },
        { name: "semester", paramName: "semester", type: "selection", value: semester, options: ["spring", "fall"] },
        { name: "course prefix", paramName: "coursePrefix", type: "text", value: "" },
        { name: "course code", paramName: "courseNumber", type: "text", value: "" },
        { name: "course title", paramName: "courseTitle", type: "text", value: "" },
        { name: "course time", paramName: "courseTime", type: "text", value: "" },
        { name: "first name", paramName: "firstName", type: "text", value: "" },
        { name: "last name", paramName: "lastName", type: "text", value: "" },
        { name: "days", paramName: "days", type: "text", value: "" },
    ]

    const [filters, setFilters] = useState(filterSet)


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
        setLoading(true);
        let baseApiEnpoint = "/courses";
        console.log(filters);
        let filterParams = filters.map((filter) => {
            if (filter.value !== "") {
                return `${filter.paramName}=${filter.value}`
            }
        }).filter((item) => { return item !== undefined })
        if (query != "") {
            filterParams.push(`query=${query}`)
        }
        let stringifiedFilterParams = filterParams.join('&');

        let url = baseApiEnpoint;
        if (filterParams.length > 0 || query != "") {
            url += `/query?${stringifiedFilterParams}`;
        }


        axiosConfig.get(url)
            .then(r => {
                let data = r.data.splice(0, 20)
                data.forEach(function (course: ICourse, index: number, array: Array<ICourse>) {
                    array[index].convertedStartDate = moment(course["startTime"], 'YYYY/MM/DD h:mm:ss');
                    array[index].convertedEndDate = moment(course["endTime"], 'YYYY/MM/DD h:mm:ss');

                })
                setResponse(data);
            }
        )
        setLoading(false);
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
