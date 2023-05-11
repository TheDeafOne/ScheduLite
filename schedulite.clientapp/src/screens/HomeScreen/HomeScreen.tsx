import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React, { useContext, useEffect, useState } from 'react';
import SearchBar from "../SearchScreen/SearchScreenComponents/SearchBar/SearchBar";

// import "../../styles/BodyStructure.scss"
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CourseDetailPanel from "../../components/CourseComponents/CourseDetailPanel";
import ICourse from "../../types/course.type";
import CoursePanel from "./CoursePanel";
import "./HomeScreen.scss";

import { linkedScheduleObjType } from "../../App";
import { ScheduleContext, ScheduleContextType } from "../../context/ScheduleContext";
import { UserContext, UserContextType } from '../../context/UserContext';
import Calendar from "./Calendar/Calendar";

// import {linkedScheduleObj, linkedScheduleObjType} from "../../App";
const Home = ({ linkedScheduleObj, panelVisible, setPanelVisible }: {
    linkedScheduleObj: linkedScheduleObjType,
    panelVisible: boolean,
    setPanelVisible: React.Dispatch<React.SetStateAction<boolean>>
}) => {

    const [calendarCourseHover, setCalendarCourseHover] = useState<ICourse | undefined>();
    const [tentativeCourseHover, setTentativeCourseHover] = useState<ICourse | undefined>();
    const [currCourse, setCourse] = useState<ICourse | undefined>();
    const [viewCourse, setViewCourse] = useState(false);
    const { saved, name, saveSchedule, errors, warnings } = useContext(ScheduleContext) as ScheduleContextType
    const { user } = useContext(UserContext) as UserContextType


    const [scheduleSaved, setScheduleSaved] = useState(false)
    const [saveMessage, setSavedMessage] = useState("")


    useEffect(() => {
        console.log("CALLLLLEDDDDD")
        setScheduleSaved(saved);
    }, [saved])
    useEffect(() => {
        if (name !== "") {
            onSaveClick()
        }
        // eslint-disable-next-line
    }, [])
    // useEffect(() => {
    //     saveSchedule()
    // })
    // const {}
    // const saveSchedule = () =>

    const onSaveClick = () => {
        console.log("saved (should only be once)")
        if (user) {
            console.log("here");
            console.log(name)
            // if (name === "") {
            //     console.log("HERE WE MADE IT");
            //     // setModal(<SetScheduleModal setIsOpen={setIsOpen} />);
            //     // setIsOpen(true);
            // } else {
            saveSchedule()
            setSavedMessage("Saved!")
            // }
        } else {
            setSavedMessage("Not logged in! Sign in to save schedule")
        }
        console.log(saveMessage);
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

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/Search`;
        navigate(path);
    }

    const removeEvent = () => {
        setTentativeCourseHover(undefined)
    }
    const addEvent = (course: ICourse) => {
        setTentativeCourseHover(course)
    }

    return (
        // <SearchPage />
        <motion.div className="container text-center">
            <div className={"main-body"}>
                {/*<MouseOverPopover />*/}
                <CoursePanel onMouseEnter={addEvent} onMouseLeave={removeEvent} onCourseClick={onCourseClick} />
                <div className={"center-panel"}>
                    <motion.div
                        key="home"
                        className="container text-center"
                        initial={{ scale: .97 }}
                        // animate={{scale: .97 }}
                        transition={{ duration: .75 }}
                    >
                        <SearchBar navigate={routeChange} autofocus={false} firstClick={true} />
                    </motion.div>

                    <Calendar tentativeCourseHover={tentativeCourseHover} setCalendarCourseHover={setCalendarCourseHover} setViewCourse={setViewCourse} />

                    {user && name !== "" && <button className="save-button" type={"button"} onClick={onSaveClick}>Save</button>}
                </div>
                <div>
                    <button className={`collapse-side-panel ${panelVisible ? "open" : "closed"} ${(warnings.credits.value) || (warnings.sameCourse.value && !panelVisible) ? "warning-button" : ""} ${errors.overlap.value && !panelVisible ? "error-button" : ""}`} onClick={() => setPanelVisible(!panelVisible)}>
                        {
                            panelVisible ? <ChevronRightIcon /> : <ChevronLeftIcon />
                        }
                    </button>
                </div>
                {
                    panelVisible && (
                        <CourseDetailPanel course={currCourse} viewCourse={viewCourse} calendarCourseHover={calendarCourseHover} />
                    )
                }
            </div>
        </motion.div>
    )
}
export default Home