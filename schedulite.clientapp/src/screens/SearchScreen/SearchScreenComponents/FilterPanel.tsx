import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
// import { HiChevronLeft } from "react-icons/hi";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import IFilter from "../../../types/filter.type";
import { ScheduleContext, ScheduleContextType } from "../../../context/ScheduleContext";

const FilterPanel = ({filters, setFilters, onEnter} : {filters : IFilter[], setFilters: Function, onEnter : Function}) => {

    const navigate = useNavigate();
    const onBackClick = () => {
        navigate("/")
    }

    const { semester, year } = useContext(ScheduleContext) as ScheduleContextType
    const handleFilterChange = (event: any, filterIndex: any) => {
        //https://stackoverflow.com/questions/72950841/component-not-re-rendering-after-change-in-an-object-state-in-react
        const newFilters = [...filters]
        newFilters[filterIndex].value = event.target.value
        setFilters(newFilters);
        onEnter(); 
    };

    return (
        <div className={"side-panel left-panel"}>
            <div className={"back-button-container"}>
                <button onClick={onBackClick} className={"back-button"}><ArrowBackIcon /></button>
                <div className={"back-button-title"}>
                    Back to Schedule
                </div>
            </div>
            <div className={"filters"}>
                {filters.map((filterInfo: any, i) => {
                    
                    return (
                        <TextField 
                        key={filterInfo.name} 
                        variant="outlined"
                        sx={{paddingBottom:"10px"}}
                        select={filterInfo.type === "selection"}
                        size="small"
                        disabled={filterInfo?.disabled}
                        onChange={(event) =>{
                            handleFilterChange(event, i);
                        }}
                        // onKeyDown={handleKeyDown}
                        value={filterInfo.value}
                        label={filterInfo.name}
                        className="filter-input"
                        >
                        {filterInfo.type === "text" ? filterInfo.name :
                        filterInfo.options.map((option: any) => (
                            <MenuItem key={option.label} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                        </TextField>
                    )
                })}
            </div>
        </div>
    )
}
export default FilterPanel;