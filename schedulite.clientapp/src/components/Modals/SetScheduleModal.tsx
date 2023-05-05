import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { ScheduleContext, ScheduleContextType } from '../../context/ScheduleContext';
import "./ScheduleModal.scss";

const SetScheduleModal = ({ setIsOpen }: any) => {
    const { setName, setSemester, setYear, setActiveCourses, setTentativeCourses } = useContext(ScheduleContext) as ScheduleContextType
    const navigate = useNavigate();
    const [scheduleSemester, setScheduleSemester] = useState("Fall")
    const [scheduleName, setScheduleName] = useState("")
    const [scheduleYear, setScheduleYear] = useState("")
    return (
        <div className={"modal-container"}>
            <div className={"modal-title"}>
                Make a new schedule!
            </div>
            {/*<br />*/}
            <div>
                <label>schedule name</label>
                <input
                    id="schedule-name"
                    type="text" required
                    className={"modal-input"}
                    placeholder="name"
                    onBlur={(nameElement) => {
                        console.log(nameElement)
                        setScheduleName(nameElement.target.value);
                    }} />
            </div>
            {/*<br />*/}
            <div>
                <label>schedule year</label>
                <select className={"modal-select"} id="schedule-year" onChange={(change) => {
                    setScheduleYear(change.target.value);
                }}>
                    <option value="">All</option>
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
                    // console.log(change.target.value)
                    setScheduleSemester(change.target.value);
                }}>
                    <option value="Fall">Fall</option>
                    <option value="Spring">Spring</option>
                </select>
            </div>

            {/* <button onClick={setIsOpen(false)}>
                close
            </button> */}
            <button className={"start-button"} onClick={() => {
                setIsOpen(false);
                setActiveCourses({ course: null, type: "setAll", courseList: [] });
                setTentativeCourses({ course: null, type: "setAll", courseList: [] });
                setName(scheduleName);
                setSemester(scheduleSemester);
                setYear(scheduleYear);
                // saveSchedule();
                navigate("/");
            }}>
                start
            </button>
        </div>
    )
}

export default SetScheduleModal;