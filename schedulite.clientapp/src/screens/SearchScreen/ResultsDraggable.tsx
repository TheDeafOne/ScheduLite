
import React, {useEffect, useState} from 'react'
import axiosConfig from "../../api/axios-config";
import SearchPage from "./SearchPage";
import Course from "../../components/CourseComponents/Course";
import "../../styles/Results.css"
import {DndContext} from '@dnd-kit/core';


const Results = (props : any) => {
    const [isDropped, setIsDropped] = useState(false);
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
    console.log(props)
    return (
        <>
            {
                props.response[1] &&
                    (
                        <div className={"results"}>
                            {
                                props.response.map((data :{} , idx: number) => {
                                    return (
                                        // <Course /> WILL PROBABLY GO HERE WITH ALL THE INFORMATION ABOUT EACH COURSE
                                        <Course data={data} idx={idx} key={idx} onCourseClick={props.onCourseClick}/>
                                    )
                                })
                            }
                        </div>
                    )
            }

        </>


    )
}

export default Results