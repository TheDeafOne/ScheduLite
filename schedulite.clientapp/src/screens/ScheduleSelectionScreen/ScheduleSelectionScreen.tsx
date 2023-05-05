import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, UserContextType } from '../../context/UserContext';
import ISchedule from "../../types/schedule.type";
import "./Block.scss";
import SetScheduleModal from "../../components/Modals/SetScheduleModal";
import { ScheduleContext, ScheduleContextType } from "../../context/ScheduleContext";
import { MdSouth } from "react-icons/md";
import SearchBar from "../SearchScreen/SearchScreenComponents/SearchBar/SearchBar";
import "../../components/Modals/ScheduleModal.scss"
import api from "../../api/axios-config";
import authHeader from "../../services/auth-header";
import authService from "../../services/auth.service";
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


export const blocks: ISchedule[] = [];
export const filteredBlocks: ISchedule[] = [];

const BlockPage = ({setIsOpen, setModal}: any) => {
  const { user,setUser } = useContext(UserContext) as UserContextType;
  const { setName, setSemester, setYear, setActiveCourses, setTentativeCourses, onScheduleOpen } = useContext(ScheduleContext) as ScheduleContextType
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
    if (user !== undefined && user !== null) {
      console.log("HERE ITS WORKING")
      setFilteredBlocks(user!.schedules);
      setInitialFilteredBlocks(user!.schedules);
    }
  })
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
    onScheduleOpen(currentSchedule.activeCourses, currentSchedule.tentativeCourses);
    navigate("/");
  };



  function isWhitespace(str: string): boolean {
    return /^\s*$/.test(str);
  }
  
  function handleCopyClick(block: ISchedule, e: any): void {
    e.stopPropagation();
    const newScheduleName = prompt("Please enter a name for the new schedule");

      if (newScheduleName === null) {
      return; // User cancelled prompt
    }else if (isWhitespace(newScheduleName)){
      alert("input error no null names");
      return;
  }

    const existingScheduleNames = filteredBlocks!.map((schedule) => schedule.scheduleName);
    if (existingScheduleNames.includes(newScheduleName)) {
      navigate("/schedule-selection");
      alert("A schedule with that name already exists. Please choose a different name.");
      return;
    }

    if (newScheduleName) {
      const newSchedule = { ...block, scheduleName: newScheduleName };
      api.post('/users/add-schedule', JSON.stringify(newSchedule), { headers: authHeader() })
        .then(response => {
          if (response.status === 200) {
            // If the response is successful, add the new schedule to the list of filtered blocks
            const updatedBlocks = [...filteredBlocks!, newSchedule];
            setFilteredBlocks(updatedBlocks);
            setInitialFilteredBlocks(updatedBlocks);
            if (user !== null) {
              user.schedules = [...user.schedules!, newSchedule];
            }
            navigate("/schedule-selection");
          } else {
            // If the response is not successful, display an error message 
            navigate("/schedule-selection");
            throw new Error('Failed to add schedule');
           
          }
        })
        .catch(error => {
          console.error(error);
          alert('Failed to add schedule');
          navigate("/schedule-selection");
        });
    }
  }
  
  
  

const handleDeleteClick = (schedule: ISchedule, e: any) => {
    e.stopPropagation();
  const confirmDelete = window.confirm(`Are you sure you want to delete schedule ${schedule.scheduleName}?`);
  if (confirmDelete) {
    // Send an HTTP POST request to the backend to remove the schedule
     // fetch('/remove-schedule', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(schedule)
    // })
    api.post('/users/remove-schedule', JSON.stringify(schedule),{headers: authHeader()})
    .then(response => {
      if (response.status === 200) {
        // If the response is successful, remove the schedule from the list of filtered blocks
        const remainingBlocks = filteredBlocks!.filter(block => block !== schedule);
        setFilteredBlocks(remainingBlocks);
        setInitialFilteredBlocks(remainingBlocks);
        if (user !== null) {
          user.schedules = user?.schedules?.filter((delete_schedule) => {
            if (delete_schedule.scheduleName !== schedule.scheduleName) {
              return delete_schedule;
            }
            navigate("/schedule-selection");
            return null
          })
        }
      } else {
        // If the response is not successful, display an error message
        throw new Error('Failed to remove schedule');
      }
    })
    .catch(error => {
      console.error(error);
      alert('Failed to remove schedule');
    });
  }
};


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
            {/*<div className="delete-button" onClick={(e) => handleDeleteClick(block, e)}></div>*/}
            {/*<div className="copy-button" onClick={(e) => handleCopyClick(block, e)}></div>*/}
            <button className="delete-button" onClick={(e) => handleDeleteClick(block, e)}><DeleteIcon /></button>
            <button className="copy-button" onClick={(e) => handleCopyClick(block, e)}><ContentCopyIcon /></button>
        
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
