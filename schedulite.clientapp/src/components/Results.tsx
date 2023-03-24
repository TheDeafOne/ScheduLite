
import React, {useEffect, useState} from 'react'
import axiosConfig from "../api/axios-config";
import SearchPage from "../screens/SearchScreen/SearchPage";
import Course from "./Course";
import "../styles/Results.css"
import ICourse from "../types/course.type";
import courseDetailPanel from "../screens/SearchScreen/SearchScreenComponents/CourseDetailPanel";


const Results = (props : any) => {
    // useEffect(() => {
    //     axiosConfig.get("/users/roles")
    //         .then(r => {
    //             console.log(r);
    //             // console.log(r.data[0].get("name"));
    //             setResponse(r.data.toString());
    //         });
    //
    // }, [])

    // console.log(props.response)
    console.log("from results props")
    console.log(props)
    return (
        <>
            {
                props.response[0] ?
                    (
                        <div className={"results"}>
                            {
                                props.response.map((data : ICourse , idx: number) => {
                                    if (props.sched) {
                                        console.log(props.sched)
                                        const tent = props.sched.tentativeCourses.some((e : ICourse) => e.id === data.id)
                                        const act = props.sched.activeCourses.some((e : ICourse) => e.id === data.id)
                                        console.log(tent)
                                        console.log(act)
                                        return (
                                            // <Course /> WILL PROBABLY GO HERE WITH ALL THE INFORMATION ABOUT EACH COURSE
                                            <Course data={data}
                                                    idx={idx}
                                                    key={idx}
                                                // props={...props}
                                                    onCourseClick={props.onCourseClick}
                                                    panel={props.panel}
                                                    onMouseEnter={props.onMouseEnter}
                                                    onMouseLeave={props.onMouseLeave}
                                                    switchAction={props.switchAction}
                                                    button={props.button}
                                                    schedule={props.schedule}
                                                    addCourse={props.addCourse}
                                                    removeCourse={props.removeCourse}
                                                    active={act}
                                                    tentative={tent}
                                            />
                                        )
                                    } else {
                                        return (
                                            <Course data={data}
                                                    idx={idx}
                                                    key={idx}
                                                // props={...props}
                                                    onCourseClick={props.onCourseClick}
                                                    panel={props.panel}
                                                    onMouseEnter={props.onMouseEnter}
                                                    onMouseLeave={props.onMouseLeave}
                                                    switchAction={props.switchAction}
                                                    button={props.button}
                                                    schedule={props.schedule}
                                                    addCourse={props.addCourse}
                                                    removeCourse={props.removeCourse}
                                            />
                                        )
                                    }

                                })
                            }
                        </div>
                    )
                    :
                    <>

                    </>
            }

        </>


    )
}

export default Results