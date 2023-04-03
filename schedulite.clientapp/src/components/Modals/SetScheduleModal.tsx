import React, { useContext } from 'react';
import { ScheduleContext, ScheduleContextType } from '../../context/ScheduleContext';

const SetScheduleModal = ({setIsOpen}: any) => {
    const { setName, setSemester, setYear } = useContext(ScheduleContext) as ScheduleContextType

    return (
        <div>
            make a new schedule:
            <label >name</label>
            <input type="text" required />
            <select id="year-filter">
                <option value="">All</option>
                <option value="2022">2020</option>
                {/* <option value="2022">2021</option> */}
                <option value="2023">2022</option>
                {/* Add more options here */}
            </select>
            <button onClick={setIsOpen(false)}>
                close
            </button>
            <button>

            </button>
        </div>
    )
}

export default SetScheduleModal;