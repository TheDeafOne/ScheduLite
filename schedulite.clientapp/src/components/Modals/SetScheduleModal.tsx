import React, { useContext } from 'react';
import { ScheduleContext, ScheduleContextType } from '../../context/ScheduleContext';

const SetScheduleModal = () => {
    const { setName, setSemester, setYear } = useContext(ScheduleContext) as ScheduleContextType

    return (
        <div>
            make a new schedule:
            <label >schedule name</label> <br />
            <input type="text" required placeholder="name"/><br />
            <select id="year-filter">
                <option value="">All</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
            </select>
            {/* <button onClick={setIsOpen(false)}>
                close
            </button> */}
            <button>

            </button>
        </div>
    )
}

export default SetScheduleModal;