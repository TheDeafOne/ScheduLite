import React, {useContext, useEffect, useState} from 'react'
import axiosConfig from "../../api/axios-config";
import SearchPage from "../SearchScreen/SearchPage";
import SearchBar from "../SearchScreen/SearchScreenComponents/SearchBar";
import Results from "../../components/CourseComponents/Results";
// import {Sortab}
import {useDraggable} from '@dnd-kit/core';
import Course from "../../components/CourseComponents/Course";
import ISchedule from "../../types/schedule.type";
import { HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi'

import ICourse from "../../types/course.type";
import {ScheduleContext, ScheduleContextType} from "../../context/ScheduleContext";

const CoursePanel = (props : any) => {

    // const [schedule, setSchedule] = useState<ISchedule>( {activeCourses : active, tentativeCourses : tentative})
    // GET BOTH THE ACTIVE AND TENTATIVE COURSE LIST FROM THE DATABASE
    const { activeCourses, setActiveCourses, tentativeCourses, setTentativeCourses, calcActiveCredits } = useContext(ScheduleContext) as ScheduleContextType

    const activeToTentative = (course : ICourse) => {
        setTentativeCourses({course: course, type: "add", unshift: true})
        setActiveCourses({course: course, type:"remove"})
    }
    const tentativeToActive = (course : ICourse) => {
        setActiveCourses({course : course, type: "add"})
        setTentativeCourses({course: course, type: "remove"})
    }

    return (

        <div className={"side-panel left-panel"} >
            <div className={"side-panel-title-container"}>
                <div className={"side-panel-title"} >
                    Current Courses
                </div>
                <div className={"side-panel-title credits"}>{calcActiveCredits()} cr.</div>
            </div>
            <Results
                response={activeCourses.courses}
                panel={true}
                onCourseClick={props.onCourseClick}
                switchAction={activeToTentative}
                button={<HiOutlineMinus />}
                schedule="active"/>
            <div className={"side-panel-title-container"}>
                <div className={"side-panel-title"} >
                    Tentative Courses
                </div>
            </div>
            <Results
                response={tentativeCourses.courses}
                panel={true}
                onCourseClick={props.onCourseClick}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseEnter}
                switchAction={tentativeToActive}
                button={<HiOutlinePlus />}
                schedule="tentative"/>


        </div>
    )
}
export default CoursePanel