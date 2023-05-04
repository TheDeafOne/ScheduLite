
import React, {useEffect, useState} from 'react'
import axiosConfig from "../../api/axios-config";
import SearchPage from "../../screens/SearchScreen/SearchPage";
import "./CourseCard.scss"
import { BiListPlus, BiListCheck } from 'react-icons/bi'
import { HiOutlinePlus, HiOutlineMinus, HiX, HiCheck } from 'react-icons/hi'
import { MdOutlinePlaylistAddCheck, MdOutlinePlaylistAdd } from "react-icons/md";

import { BiAddToQueue } from 'react-icons/bi'
import ICourse from "../../types/course.type";

const CourseCard = ({course} :{ course : ICourse}) => {


    return (
        <div className={"course-card-container"}>
            <span className={"course-card-title"}>
                {course.courseTitle}<span className={"course-card-title course-section"}> - {course.courseSection} | {course.creditHours} cr.</span>
            </span>
            <span className={"course-card-subtitle"}>{course.onMonday === "True" ? "M" : ""}{course.onTuesday === "True" ? "T" : ""}{course.onWednesday === "True" ? "W" : ""}{course.onThursday === "True" ? "R" : ""}{course.onFriday === "True" ? "F" : ""}, {course.convertedStartDate ? course.convertedStartDate.format("hh:mm") : ""} - {course.convertedEndDate ? course.convertedEndDate.format("hh:mm") : ""} | {course.semester}</span>
            <span className={"data"}><span className={"data-title"}>Code:</span> {course.coursePrefix} {course.courseNumber}</span>
            <span className={"data"}><span className={"data-title"}>Professor:</span> {course.firstName} {course.lastName}</span>
            <span className={"data"}><span className={"data-title"}>Course capacity:</span> {course.courseCapacity}</span>
            <span className={"data"}><span className={"data-title"}>Room:</span> {course.buildingCode} {course.roomCode}</span>
            <span className={"data"}><span className={"data-title"}>Year:</span> {course.year}</span>
        </div>
    )


}

export default CourseCard
