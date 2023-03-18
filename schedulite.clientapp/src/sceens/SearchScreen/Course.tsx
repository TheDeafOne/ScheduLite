
import React, {useEffect, useState} from 'react'
import axiosConfig from "../../api/axios-config";
import SearchPage from "./SearchPage";

const Course = (props : any) => {

    console.log(props.response)
    const onClick = (event : any) => {
        console.log(props.data);
        console.log(props);
        console.log(event)

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
                (<div key={props.data.key}>
                    <div className={"class-info"}>
                        {props.data.name}
                        <br/>
                        {/*{props.data.id}*/}
                    </div>


                    {/*ONLY SHOW THE BUTTON IF THE USER IS SIGNED IN*/}
                    <div className={"add-course"}>
                        <button type="button" onClick={onClick}>Click Me!</button>
                    </div>

                </div>)
                :
                (<div key={props.data.key}>
                    <div className={"class-info"}>
                        {props.data.name}
                        <br/>
                        {props.data.id}
                    </div>


                    {/*ONLY SHOW THE BUTTON IF THE USER IS SIGNED IN*/}
                    <div className={"add-course"}>
                        <button type="button" onClick={onClick}>Click Me!</button>
                    </div>

                </div>)
            }
    </>
    )
}

export default Course
