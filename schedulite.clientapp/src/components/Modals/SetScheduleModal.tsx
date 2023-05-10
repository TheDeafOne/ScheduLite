import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { ScheduleContext, ScheduleContextType } from '../../context/ScheduleContext';
import { UserContext, UserContextType } from '../../context/UserContext';
import "./ScheduleModal.scss";
import { MenuItem, TextField } from '@mui/material';

const SetScheduleModal = ({ setIsOpen }: any) => {
    const { setName, setSemester, setYear, setActiveCourses, setTentativeCourses } = useContext(ScheduleContext) as ScheduleContextType
    const { user } = useContext(UserContext) as UserContextType;
    const navigate = useNavigate();
    const [scheduleSemester, setScheduleSemester] = useState("Fall")
    const [scheduleName, setScheduleName] = useState("")
    const [scheduleYear, setScheduleYear] = useState("")
    function isWhitespace(str: string): boolean {
        return /^\s*$/.test(str);
    }

    const handleStart = () => {
        if (!scheduleName) {
            alert('Please enter a schedule name');
            return;
        } else if (isWhitespace(scheduleName)) {
            alert("input error no null names");
            return;
        }

        if (user?.schedules?.some((s: { scheduleName: string; }) => s.scheduleName === scheduleName)) {
            alert('A schedule with this name already exists. Please choose a different name.');
            return;
        }

        if (scheduleYear === "") {
            alert('Please select a year');
            return;
        }
        console.log('making schedule');
        
        setIsOpen(false);
        setActiveCourses({ course: null, type: "setAll", courseList: [] });
        setTentativeCourses({ course: null, type: "setAll", courseList: [] });
        setName(scheduleName);
        setSemester(scheduleSemester);
        setYear(scheduleYear);

        navigate("/");
    }

    return (
        <div className={"modal-container"}>
            <div className={"modal-title"}>
                Make a new schedule!
            </div>

            <div className={"modal-row"}>
                <TextField
                    variant="outlined"
                    sx={{ width: "100%" }}
                    size="medium"
                    label={"Title"}
                    onBlur={(nameElement) => {
                        setScheduleName(nameElement.target.value);
                    }}
                    defaultValue=""
                />
               
            </div>

            <div className={"modal-row"}>
                <TextField 
                    select
                    variant="outlined"
                    sx={{ width: "100%" }}
                    size="medium"
                    label={"Year"}
                    onChange={(change) => {
                        setScheduleYear(change.target.value);
                    }}
                    defaultValue=""
                >
                    <MenuItem value={"2018"}>
                        2018
                    </MenuItem>
                    <MenuItem value={"2019"}>
                        2019
                    </MenuItem>
                    <MenuItem value={"2020"}>
                        2020
                    </MenuItem>
                </TextField>
            </div>

            <div className={"modal-row"}>
                <TextField 
                    select
                    variant="outlined"
                    sx={{ width: "100%" }}
                    size="medium"
                    label={"Semester"}
                    onChange={(change) => {
                        setScheduleSemester(change.target.value);
                    }}
                    defaultValue=""
                >
                    <MenuItem value={"Fall"}>
                        Fall
                    </MenuItem>
                    <MenuItem value={"Spring"}>
                        Spring
                    </MenuItem>
                </TextField>
            </div>

            <button className={"start-button"} onClick={handleStart}>
                start
            </button>
        </div>
    )
}

export default SetScheduleModal;
