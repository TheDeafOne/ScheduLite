import React, {useEffect, useState} from 'react'
import axiosConfig from "../../api/axios-config";
import SearchPage from "../SearchScreen/SearchPage";
import SearchBar from "../SearchScreen/SearchBar";
import Results from "../SearchScreen/Results";

const CoursePanel = () => {
    const fakeSchedule = [{  "_id": {    "$oid": "641463211d1ed0444011a176"  },  "year": "2018",  "semester": "Fall",  "course_prefix": "ABRD",  "course_number": "300",  "course_section": "A",  "last_name": "Johnson",  "first_name": "Lois",  "course_title": "STUDY ABROAD",  "credit_hours": "0",  "credit_variation": "N",  "course_capacity": "50",  "crs_enrollment": "16",  "building_code": "OFFCP"}]
    return (
        <div className={"side-panel"}>
            Course Panel

            <Results />
        </div>
    )
}
export default CoursePanel