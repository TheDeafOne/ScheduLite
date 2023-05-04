import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router';
import { ScheduleContext, ScheduleContextType } from '../../context/ScheduleContext';
import "./ScheduleModal.scss"
import {filteredBlocks} from "../../screens/ScheduleSelectionScreen/ScheduleSelectionScreen"
import { UserContext, UserContextType } from '../../context/UserContext';

const SetScheduleModal = ({ setIsOpen }: any) => {
    const { setName, setSemester, setYear, setActiveCourses, setTentativeCourses, saveSchedule } = useContext(ScheduleContext) as ScheduleContextType
    const { user } = useContext(UserContext) as UserContextType;
    const navigate = useNavigate();
    const [ scheduleSemester, setScheduleSemester ] = useState("Fall")
    const [ scheduleName, setScheduleName ] = useState("")
    const [ scheduleYear, setScheduleYear ] = useState("")
    function isWhitespace(str: string): boolean {
        return /^\s*$/.test(str);
      }
      
    const handleStart = () => {
        if (!scheduleName) {
            alert('Please enter a schedule name');
            return;
        }else if (isWhitespace(scheduleName)){
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

        
        setIsOpen(false);
        setActiveCourses({course: null, type:"setAll", courseList: []});
        setTentativeCourses({course: null, type:"setAll", courseList: []});
        setName(scheduleName);
        setSemester(scheduleSemester);
        setYear(scheduleYear);

        console.log("SCHEDULE SHOULD BE SAVED")
        navigate("/");
    }

    return (
        <div className={"modal-container"}>
            <div className={"modal-title"}>
                Make a new schedule!
            </div>

            <div>
                <label>schedule name</label>
                <input
                    id="schedule-name"
                    type="text" required
                    className={"modal-input"}
                    placeholder="name"
                    onBlur={(nameElement) => {
                        setScheduleName(nameElement.target.value);
                    }} />
            </div>

            <div>
                <label>schedule year</label>
                <select className={"modal-select"} id="schedule-year" value={scheduleYear} onChange={(change) => {
                    setScheduleYear(change.target.value);
                }}>
                    <option value="any">Any</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                </select>
            </div>

            <div>
                <label>schedule semester</label>
                <select className={"modal-select"} id="schedule-semester" value={scheduleSemester} onChange={(change) => {
                    setScheduleSemester(change.target.value);
                }}>
                    <option value="any">Any</option>
                    <option value="Fall">Fall</option>
                    <option value="Spring">Spring</option>
                </select>
            </div>

            <button className={"start-button"} onClick={handleStart}>
                start
            </button>
        </div>
    )
}

export default SetScheduleModal;
