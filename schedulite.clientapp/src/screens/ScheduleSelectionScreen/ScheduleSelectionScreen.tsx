import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, UserContextType } from '../../context/UserContext';
import ISchedule from "../../types/schedule.type";
import "./Block.css";
import SetScheduleModal from "../../components/Modals/SetScheduleModal";
import { ScheduleContext, ScheduleContextType } from "../../context/ScheduleContext";
import { MdSouth } from "react-icons/md";


const blocks: ISchedule[] = [];


const BlockPage = ({setIsOpen, setModal}: any) => {
  const { user } = useContext(UserContext) as UserContextType;
  const { setName, setSemester, setYear, setActiveCourses, setTentativeCourses } = useContext(ScheduleContext) as ScheduleContextType


  const [yearFilter, setYearFilter] = useState<number | undefined>();
  const [semesterFilter, setSemesterFilter] = useState<string | undefined>();
  const [filteredBlocks, setFilteredBlocks] = useState<ISchedule[] | undefined>(blocks);
  const navigate = useNavigate();

  useEffect(() => {
    const yearFilteredBlocks = yearFilter !== undefined ? filteredBlocks!.filter((block) => Number(block.year ) === yearFilter) : filteredBlocks;
    const semesterFilteredBlocks = semesterFilter !== undefined ? filteredBlocks!.filter((block) => block.semester === semesterFilter) : filteredBlocks;
    setFilteredBlocks(yearFilteredBlocks!.filter((block) => semesterFilteredBlocks!.includes(block)));
  }, [yearFilter, semesterFilter]);

  const handleYearFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYearFilter(parseInt(event.target.value));
  };

  const handleSemesterFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSemesterFilter(event.target.value);
  };

  const handleBlockClick = (currentSchedule: ISchedule) => {
    setName(currentSchedule.scheduleName);
    setSemester(currentSchedule.semester);
    setYear(currentSchedule.year);
    setActiveCourses({course: null, type:"setAll", courseList:currentSchedule.activeCourses});
    setTentativeCourses({course: null, type:"setAll", courseList:currentSchedule.tentativeCourses});
    navigate("/");
  };

  useEffect(() => {
    if (user !== undefined && user !== null) {
      setFilteredBlocks(user!.schedules);
    }
  }, [])

  return (
    <div className={"schedule-select-container"}>
      <div>
        <label htmlFor="year-filter">Year:</label>
        <select className="schedule-select" id="year-filter" onChange={handleYearFilterChange}>
          <option value="">All</option>
          <option value="2022">2020</option>
          <option value="2022">2021</option>
          <option value="2023">2022</option>
        </select>
      </div>
      <div>
        <label htmlFor="semester-filter">Semester:</label>
        <select className="schedule-select" id="semester-filter" onChange={handleSemesterFilterChange}>
          <option value="">All</option>
          <option value="Fall">Fall</option>
          <option value="Spring">Spring</option>
        </select>
      </div>
      <div>
        {filteredBlocks!.map((block, index) => (
          <div key={index} className="block" onClick={() => handleBlockClick(block)}>
            <div>{block.scheduleName}</div><br/>  <div>{block.semester}</div><br/><div>{block.year}</div>
          </div>
        ))}
        <div className="block new" onClick={() => {
          setModal(<SetScheduleModal setIsOpen={setIsOpen}/>);
          setIsOpen(true);
        }}>
          +
        </div>
      </div>
    </div>
  );
};

export default BlockPage;
