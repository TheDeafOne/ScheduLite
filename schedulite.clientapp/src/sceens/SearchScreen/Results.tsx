
import React, {useEffect, useState} from 'react'
import axiosConfig from "../../api/axios-config";
import SearchPage from "./SearchPage";
import Course from "./Course";

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

    console.log(props.response)
    return (
        <div>
            {
                props.response.map((data :{} , idx: number) => {
                    return (
                        // <Course /> WILL PROBABLY GO HERE WITH ALL THE INFORMATION ABOUT EACH COURSE
                        <Course data={data} idx={idx} key={idx} />
                    )
                })
            }

        </div>

    )
}

export default Results