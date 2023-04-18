import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, UserContextType } from '../../context/UserContext';
import ISchedule from "../../types/schedule.type";
import "./Block.css";
import SetScheduleModal from "../../components/Modals/SetScheduleModal";
import { ScheduleContext, ScheduleContextType } from "../../context/ScheduleContext";
import { MdSouth } from "react-icons/md";
import SearchBar from "../SearchScreen/SearchScreenComponents/SearchBar/SearchBar";
import "../../components/Modals/ScheduleModal.scss"

const blocks: ISchedule[] = [];


const BlockPage = ({setIsOpen, setModal}: any) => {
  const { user } = useContext(UserContext) as UserContextType;
  const { setName, setSemester, setYear, setActiveCourses, setTentativeCourses } = useContext(ScheduleContext) as ScheduleContextType


  const [yearFilter, setYearFilter] = useState<string | undefined>();
  const [semesterFilter, setSemesterFilter] = useState<string | undefined>();
  const [initialFilteredBlocks, setInitialFilteredBlocks] = useState<ISchedule[] | undefined>(blocks)
  const [filteredBlocks, setFilteredBlocks] = useState<ISchedule[] | undefined>(blocks);
  const navigate = useNavigate();

  const routeChange = () =>{
    let path = `/Search`;
    navigate(path);
  }
  useEffect(() => {
    let blocks = initialFilteredBlocks
    const yearFilteredBlocks = (yearFilter !== undefined && yearFilter !== "") ? blocks!.filter((block) => block.year === yearFilter) : blocks;
    const semesterFilteredBlocks = (semesterFilter !== undefined && semesterFilter !== "") ? blocks!.filter((block) => block.semester === semesterFilter) : blocks;
    setFilteredBlocks(yearFilteredBlocks!.filter((block) => semesterFilteredBlocks!.includes(block)));
  }, [yearFilter, semesterFilter]);

  const handleYearFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYearFilter(event.target.value);
  };

  const handleSemesterFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSemesterFilter(event.target.value);
  };

  // const newSchedule = ()
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
      setInitialFilteredBlocks(user!.schedules);
    }
  }, [])

  return (
    <div className={"schedule-select-container"}>
      {/*<SearchBar navigate={routeChange} autofocus={false} firstClick={true}/>*/}
      <div className={"schedule-filter-container"}>
        <div className={"schedule-filters"}>
          <div className={"filter"}>
            <label htmlFor="year-filter">Year: </label>
            <select className="schedule-select" id="year-filter" onChange={handleYearFilterChange}>
              <option value="">All</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
            </select>
          </div>
          <div className={"filter"}>
            <label htmlFor="semester-filter">Semester: </label>
            <select className="schedule-select" id="semester-filter" onChange={handleSemesterFilterChange}>
              <option value="">All</option>
              <option value="Fall">Fall</option>
              <option value="Spring">Spring</option>
            </select>
          </div>
      </div></div>
      <div className={"schedule-options"}>
        {filteredBlocks!.map((block, index) => (
          <div key={index} className="block" onClick={() => handleBlockClick(block)}>
            <div className={"schedule-name"}>{block.scheduleName}</div><div>Semester: {block.semester ? block.semester : "No Semester"}</div><div>Year: {block.year}</div>
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
