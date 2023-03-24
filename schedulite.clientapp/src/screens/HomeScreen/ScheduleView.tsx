import React, {useEffect, useState} from 'react'
import axiosConfig from "../../api/axios-config";
import SearchPage from "../SearchScreen/SearchPage";
import SearchBar from "../SearchScreen/SearchScreenComponents/SearchBar";
import MyCalendar from "../SearchScreen/ScheduleTest";

const ScheduleView = (props : any) => {
    return (
        <MyCalendar />
    )
}
export default ScheduleView