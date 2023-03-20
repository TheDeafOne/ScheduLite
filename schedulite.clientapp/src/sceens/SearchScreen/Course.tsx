
import React, {useEffect, useState} from 'react'
import axiosConfig from "../../api/axios-config";
import SearchPage from "./SearchPage";
import "../../styles/Course.css"
const Course = (props : any) => {

    // console.log(props.response)
    const onCourseClick = (event : any) => {
        console.log(props)
        props.onCourseClick(props.data)
    }
    const onClick = (event : any) => {
        event.stopPropagation();
        // console.log(props.data);
        console.log(props);
        // console.log(event)
        console.log(`ADDING ${props.data.course_title} to schedule!`)

        // ADD TO SCHEDULE HERE
        // axiosConfig.get("https://64161c4d351c4aed49178971.mockapi.io/api/v1/courses")
        //     .then(r => {
        //         console.log((r.data));
        //     })
        // HANDLE BAD ADDITION TO SCHEDULE

    }
    return (
        <>
            {props.panel ?
                (<div className={"Course"} onClick={props.onCourseClick} key={props.data.key}>
                    <div className={"class-info"}>
                        {props.data.course_title}
                        <br/>
                        {/*{props.data.id}*/}
                    </div>


                    {/*ONLY SHOW THE BUTTON IF THE USER IS SIGNED IN*/}
                    <div className={"add-course"}>
                        <button type="button" onClick={onClick}>Click Me!</button>
                    </div>

                </div>)
                :
                (<div className={"course"} onClick={onCourseClick} key={props.data.key}>
                    <div className={"class-info"}>
                        <div className={"course-title"}>
                            {props.data.course_title}
                        </div>
                        <br/>
                        <div className={"subtitle"}>
                        {props.data.semester}
                        </div>
                        {/*{props.data.id}*/}
                    </div>


                    {/*ONLY SHOW THE BUTTON IF THE USER IS SIGNED IN*/}
                    <div className={"add-course"}>
                        <button type="button" onClick={onClick}>+</button>
                    </div>

                </div>)
            }
    </>
    )
}

export default Course
