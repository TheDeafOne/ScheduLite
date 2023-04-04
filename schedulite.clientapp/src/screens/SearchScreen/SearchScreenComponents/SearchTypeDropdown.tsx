import React, { useState } from "react";

const SearchTypeDropdown = (props : any) => {

    // const [value, setValue] = useState(props.searchType);

    const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        props.setSearchType(e.target.value);
    };
    return (
        <div>
            <select className={"minimal search-select"} id={"options"} value={props.searchType} onChange={handleChange}>
                <option value={"Course Code"}>Course Code</option>
                <option value={"Course Title"}>Course Title</option>
            </select>
        </div>
    );
}

export default SearchTypeDropdown;