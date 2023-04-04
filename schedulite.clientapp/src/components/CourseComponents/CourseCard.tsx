
import React, {useEffect, useState} from 'react'
import axiosConfig from "../../api/axios-config";
import SearchPage from "../../screens/SearchScreen/SearchPage";
import "../../styles/CourseCard.css"
import { BiListPlus, BiListCheck } from 'react-icons/bi'
import { HiOutlinePlus, HiOutlineMinus, HiX, HiCheck } from 'react-icons/hi'
import { MdOutlinePlaylistAddCheck, MdOutlinePlaylistAdd } from "react-icons/md";

import { BiAddToQueue } from 'react-icons/bi'
import ICourse from "../../types/course.type";

const CourseCard = ({course} :{ course : ICourse}) => {


    return (
        <div className={"course-card-container"}>
            <span className={"course-card-title"}>
                {course.course_title}<span className={"course-card-title course-section"}> - {course.course_section} | {course.credit_hours} cr.</span>
            </span>
            <span className={"course-card-subtitle"}>{course.on_monday}{course.on_tuesday}{course.on_wednesday}{course.on_thursday}{course.on_friday}, {course.converted_start_date ? course.converted_start_date.format("hh:mm") : ""} - {course.converted_end_date ? course.converted_end_date.format("hh:mm") : ""} | {course.semester}</span>
            <span className={"data"}><span className={"data-title"}>Code:</span> {course.course_prefix} {course.course_number}</span>
            <span className={"data"}><span className={"data-title"}>Professor:</span> {course.first_name} {course.last_name}</span>
            <span className={"data"}><span className={"data-title"}>Course capacity:</span> {course.course_capacity}</span>
            <span className={"data"}><span className={"data-title"}>Room:</span> {course.building_code} {course.room_code}</span>
            <span className={"data"}><span className={"data-title"}>Year:</span> {course.year}</span>
        </div>
    )


}

export default CourseCard
