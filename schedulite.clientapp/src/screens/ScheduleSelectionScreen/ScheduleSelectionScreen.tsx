import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios-config";
import "../../components/Modals/ScheduleModal.scss";
import SetScheduleModal from "../../components/Modals/SetScheduleModal";
import { ScheduleContext, ScheduleContextType } from "../../context/ScheduleContext";
import { UserContext, UserContextType } from '../../context/UserContext';
import authHeader from "../../services/auth-header";
import ISchedule from "../../types/schedule.type";
import "./Block.scss";
import { MenuItem, TextField } from '@mui/material';


export const blocks: ISchedule[] = [];
export const filteredBlocks: ISchedule[] = [];

const BlockPage = ({ setIsOpen, setModal }: any) => {
  const { user } = useContext(UserContext) as UserContextType;
  const { setName, setSemester, setYear, setActiveCourses, setTentativeCourses, onScheduleOpen } = useContext(ScheduleContext) as ScheduleContextType
  const [yearFilter, setYearFilter] = useState<string | undefined>();
  const [semesterFilter, setSemesterFilter] = useState<string | undefined>();
  const [initialFilteredBlocks, setInitialFilteredBlocks] = useState<ISchedule[] | undefined>(blocks)
  const [filteredBlocks, setFilteredBlocks] = useState<ISchedule[] | undefined>(blocks);
  const navigate = useNavigate();


  useEffect(() => {
    if (user !== undefined && user !== null) {
      setFilteredBlocks(user.schedules);
      setInitialFilteredBlocks(user.schedules);

    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (user !== undefined && user !== null) {
      setFilteredBlocks(user.schedules);
      setInitialFilteredBlocks(user.schedules);
    }
  }, [user])
  useEffect(() => {
    let blocks = initialFilteredBlocks
    const yearFilteredBlocks = (yearFilter !== undefined && yearFilter !== "") ? blocks!.filter((block) => block.year === yearFilter) : blocks;
    const semesterFilteredBlocks = (semesterFilter !== undefined && semesterFilter !== "") ? blocks!.filter((block) => block.semester === semesterFilter) : blocks;
    setFilteredBlocks(yearFilteredBlocks!.filter((block) => semesterFilteredBlocks!.includes(block)));
    // eslint-disable-next-line
  }, [yearFilter, semesterFilter]);

  const handleYearFilterChange = (event: any) => {
    setYearFilter(event.target.value);
  };

  const handleSemesterFilterChange = (event: any) => {
    setSemesterFilter(event.target.value);
  };

  // const newSchedule = ()
  const handleBlockClick = (currentSchedule: ISchedule) => {
    setName(currentSchedule.scheduleName);
    setSemester(currentSchedule.semester);
    setYear(currentSchedule.year);
    setActiveCourses({ course: null, type: "setAll", courseList: currentSchedule.activeCourses });
    setTentativeCourses({ course: null, type: "setAll", courseList: currentSchedule.tentativeCourses });
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
    } else if (isWhitespace(newScheduleName)) {
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
      api.post('/users/remove-schedule', JSON.stringify(schedule), { headers: authHeader() })
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
          <TextField 
              select
              variant="outlined"
              sx={{ width: "100%",marginTop: "10px"}}
              size="medium"
              label={"Year"}
              onChange={handleYearFilterChange}
              defaultValue=""
            >
              <MenuItem value={""}>
                  Any
              </MenuItem>
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
          <div className={"filter"}>
          <TextField 
              select
              variant="outlined"
              sx={{ width: "100%", marginTop: "10px"}}
              size="medium"
              label={"Semester"}
              onChange={handleSemesterFilterChange}
              defaultValue=""
            >
              <MenuItem value={""}>
                  Any
              </MenuItem>
              <MenuItem value={"Fall"}>
                  Fall
              </MenuItem>
              <MenuItem value={"Spring"}>
                  Spring
              </MenuItem>
            </TextField>
          </div>
        </div></div>
      <div className={"schedule-options"}>
        {filteredBlocks!.length !== 0 ? filteredBlocks!.map((block, index) => (
          <div key={index} className="block" onClick={() => handleBlockClick(block)}>
            <div className={"schedule-name"}>{block.scheduleName}</div><div>Semester: {block.semester ? block.semester : "No Semester"}</div><div>Year: {block.year}</div>
            {/*<div className="delete-button" onClick={(e) => handleDeleteClick(block, e)}></div>*/}
            {/*<div className="copy-button" onClick={(e) => handleCopyClick(block, e)}></div>*/}
            <button className="delete-button" onClick={(e) => handleDeleteClick(block, e)}><DeleteIcon /></button>
            <button className="copy-button" onClick={(e) => handleCopyClick(block, e)}><ContentCopyIcon /></button>

          </div>
        )) : user?.schedules && user.schedules.map((block, index) => (
          <div key={index} className="block" onClick={() => handleBlockClick(block)}>
            <div className={"schedule-name"}>{block.scheduleName}</div><div>Semester: {block.semester ? block.semester : "No Semester"}</div><div>Year: {block.year}</div>
            {/*<div className="delete-button" onClick={(e) => handleDeleteClick(block, e)}></div>*/}
            {/*<div className="copy-button" onClick={(e) => handleCopyClick(block, e)}></div>*/}
            <button className="delete-button" onClick={(e) => handleDeleteClick(block, e)}><DeleteIcon /></button>
            <button className="copy-button" onClick={(e) => handleCopyClick(block, e)}><ContentCopyIcon /></button>

          </div>
        ))}
        <div className="block new" onClick={() => {
          setModal(<SetScheduleModal setIsOpen={setIsOpen} />);
          setIsOpen(true);
        }}>
          +
        </div>
      </div>
    </div>
  );

};

export default BlockPage;
