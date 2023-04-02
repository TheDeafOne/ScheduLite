import React, {useEffect, useState} from 'react'
import axiosConfig from "../../api/axios-config";
import SearchPage from "../SearchScreen/SearchPage";
import SearchBar from "../SearchScreen/SearchScreenComponents/SearchBar";
import Results from "../../components/Results";
// import {Sortab}
import {useDraggable} from '@dnd-kit/core';
import Course from "../../components/Course";
import ISchedule from "../../types/schedule.type";
import { HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi'

import ICourse from "../../types/course.type";

const CoursePanel = (props : any) => {

    // const [schedule, setSchedule] = useState<ISchedule>( {activeCourses : active, tentativeCourses : tentative})
    // GET BOTH THE ACTIVE AND TENTATIVE COURSE LIST FROM THE DATABASE
    const scheduleTypes = {
        "tentative": props.schedule.tentative,
        "active": props.schedule.active
    }

    const activeCourses = () : number => {
        let credits : number = 0
        props.schedule.activeCourses.forEach(function(elem : ICourse, index : number) {
            credits += +elem.credit_hours;
        });
        return credits
    }
    const [activeCredits, setActiveCredits] = useState(activeCourses())

    const activeToTentative = (courseId : string) => {
        props.schedule.activeCourses.forEach(function(elem : ICourse, index : number) {
            if (elem["id"] === courseId) {
                setActiveCredits(activeCredits - +elem.credit_hours);
                props.schedule.activeCourses.splice(index, 1);
                props.schedule.tentativeCourses.unshift(elem);
                props.setSchedule({activeCourses: props.schedule.activeCourses, tentativeCourses: props.schedule.tentativeCourses})
            }
        });

    }
    const tentativeToActive = (courseId : string) => {
        props.schedule.tentativeCourses.forEach(function(elem : ICourse, index : number) {
            console.log("here")
            console.log(courseId)
            if (elem["id"] === courseId) {
                setActiveCredits(activeCredits + +elem.credit_hours);
                props.schedule.tentativeCourses.splice(index, 1);
                props.schedule.activeCourses.push(elem);
                props.setSchedule({activeCourses: props.schedule.activeCourses, tentativeCourses: props.schedule.tentativeCourses})

            }
        });
    }
    const removeCourse = (courseId : string, schedule : string) => {
        console.log(`Remove course :${courseId} ${schedule}`)
        let currSchedule: ICourse[];
        console.log(props.schedule)
        if (schedule === "active") {
            console.log("active here")
            currSchedule = props.schedule.activeCourses
        } else {
            console.log("tentative here")
            currSchedule = props.schedule.tentativeCourses
        }
        console.log(currSchedule)
        currSchedule.forEach(function(elem : ICourse, index : number) {
            if (elem["id"] === courseId) {
                currSchedule.splice(index, 1);
            }
        });
        setActiveCredits(activeCourses)
        props.setSchedule({activeCourses: props.schedule.activeCourses, tentativeCourses: props.schedule.tentativeCourses})
    }
    return (

        <div className={"side-panel left-panel"} >
            <div className={"side-panel-title-container"}>
                <div className={"side-panel-title"} >
                    Current Courses
                </div>
                <div className={"side-panel-title credits"}>{activeCredits} cr.</div>
            </div>
            <Results
                response={props.schedule.activeCourses}
                panel={true}
                onCourseClick={props.onCourseClick}
                switchAction={activeToTentative}
                button={<HiOutlineMinus />}
                schedule="active"
                removeCourse={removeCourse}/>
            <div className={"side-panel-title-container"}>
                <div className={"side-panel-title"} >
                    Tentative Courses
                </div>
            </div>
            <Results
                response={props.schedule.tentativeCourses}
                panel={true}
                onCourseClick={props.onCourseClick}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseEnter}
                switchAction={tentativeToActive}
                button={<HiOutlinePlus />}
                schedule="tentative"
                removeCourse={removeCourse}/>


        </div>
    )
}
export default CoursePanel