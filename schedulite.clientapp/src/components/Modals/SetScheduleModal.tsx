import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router';
import { ScheduleContext, ScheduleContextType } from '../../context/ScheduleContext';

const SetScheduleModal = ({ setIsOpen }: any) => {
    const { setName, setSemester, setYear, setActiveCourses, setTentativeCourses } = useContext(ScheduleContext) as ScheduleContextType
    const navigate = useNavigate();
    const [ scheduleSemester, setScheduleSemester ] = useState("Fall")
    const [ scheduleName, setScheduleName ] = useState("")
    const [ scheduleYear, setScheduleYear ] = useState("")
    return (
        <div>
            make a new schedule:
            <label>schedule name</label> <br />
            <input
                id="schedule-name"
                type="text" required
                placeholder="name"
                onBlur={(nameElement) => {
                    console.log(nameElement)
                    setScheduleName(nameElement.target.value);
                }} />
            <br />
            <label>schedule year</label> <br />
            <select id="schedule-year" onChange={(change) => {
                setScheduleYear(change.target.value);
            }}>
                <option value="">All</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
            </select> <br />
            <label>schedule semester</label> <br />
            <select id="schedule-semester" value={scheduleSemester} onChange={(change) => {
                // console.log(change.target.value)
                setScheduleSemester(change.target.value);
            }}>
                <option value="Fall">Fall</option>
                <option value="Spring">Spring</option>
            </select> <br />
            {/* <button onClick={setIsOpen(false)}>
                close
            </button> */}
            <button onClick={() => {
                setIsOpen(false);
                setActiveCourses({course: null, type:"setAll", courseList: []});
                setTentativeCourses({course: null, type:"setAll", courseList: []});
                setName(scheduleName);
                setSemester(scheduleSemester);
                setYear(scheduleYear);
                navigate("/");
            }}>
                start
            </button>
        </div>
    )
}

export default SetScheduleModal;