
import React, {useEffect, useState} from 'react'
import axiosConfig from "../../api/axios-config";
import SearchPage from "./SearchPage";

const Course = (props : any) => {

    console.log(props.response)
    const onClick = (event : any) => {
        console.log(props.data.id);
        // ADD TO SCHEDULE HERE
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
