import React, {useState} from 'react';
import './styles/App.css';
import {Routes, Route, useLocation} from 'react-router-dom';
import Home from './screens/HomeScreen/HomeScreen';
import SearchPage from "./screens/SearchScreen/SearchPage";
import {AnimatePresence} from "framer-motion";
import ISchedule from "./types/schedule.type";
import ICourse from "./types/course.type";
import Profile from "./screens/ProfileScreen/profile.screen"
import Signup from "./screens/SignupScreen/signup.screen";
import Login from "./screens/LoginScreen/login.screen";

function App() {
    const location = useLocation();
    const active: ICourse[] = [{"id":"641463211d1ed0444011a19e","year":2018,"semester":"Fall","course_prefix":"BIOL","course_number":301,"course_section":"L","last_name":"Stauff","first_name":"Devin","course_title":"LABORATORY","credit_hours":0,"credit_variation":"N","course_capacity":9,"crs_enrollment":11,"building_code":"RO","room_code":"121","on_monday":null,"on_tuesday":"T","on_wednesday":null,"on_thursday":"R","on_friday":null,"start_time":"1/1/1900 11:30","end_time":"1/1/1900 12:45","preferred_name":null},{"id":"641463211d1ed0444011a19f","year":2018,"semester":"Fall","course_prefix":"BIOL","course_number":305,"course_section":"A","last_name":"Dudt","first_name":"Jan","course_title":"PLANT TAXONOMY","credit_hours":4,"credit_variation":"N","course_capacity":20,"crs_enrollment":12,"building_code":"STEM","room_code":"245","on_monday":"M","on_tuesday":null,"on_wednesday":"W","on_thursday":null,"on_friday":"F","start_time":"1/1/1900 10:00","end_time":"1/1/1900 10:50","preferred_name":null},{"id":"641463211d1ed0444011a1a0","year":2018,"semester":"Fall","course_prefix":"BIOL","course_number":305,"course_section":"L","last_name":"Dudt","first_name":"Jan","course_title":"LABORATORY","credit_hours":0,"credit_variation":"N","course_capacity":20,"crs_enrollment":12,"building_code":"STEM","room_code":"126","on_monday":null,"on_tuesday":null,"on_wednesday":"W","on_thursday":null,"on_friday":null,"start_time":"1/1/1900 14:00","end_time":"1/1/1900 16:59","preferred_name":null},{"id":"641463211d1ed0444011a1a1","year":2018,"semester":"Fall","course_prefix":"BIOL","course_number":313,"course_section":"A","last_name":"Farone","first_name":"Tracy","course_title":"HISTOLOGY","credit_hours":3,"credit_variation":"N","course_capacity":20,"crs_enrollment":20,"building_code":"STEM","room_code":"245","on_monday":null,"on_tuesday":"T","on_wednesday":null,"on_thursday":"R","on_friday":null,"start_time":"1/1/1900 13:00","end_time":"1/1/1900 14:15","preferred_name":null},{"id":"641463211d1ed0444011a1a2","year":2018,"semester":"Fall","course_prefix":"BIOL","course_number":331,"course_section":"A","last_name":"Brenner","first_name":"Frederic","course_title":"ECOLOGY","credit_hours":4,"credit_variation":"N","course_capacity":24,"crs_enrollment":7,"building_code":"RO","room_code":"218","on_monday":null,"on_tuesday":"T","on_wednesday":null,"on_thursday":"R","on_friday":null,"start_time":"1/1/1900 8:00","end_time":"1/1/1900 9:15","preferred_name":"Fred"}]
    const tentative: ICourse[] = [{"id":"641463211d1ed0444011a2a6","year":2018,"semester":"Fall","course_prefix":"HUMA","course_number":102,"course_section":"H","last_name":"Shepson","first_name":"Donald","course_title":"CIV/BIBLICAL REVELATION","credit_hours":3,"credit_variation":"N","course_capacity":35,"crs_enrollment":38,"building_code":"HAL","room_code":"210","on_monday":null,"on_tuesday":"T","on_wednesday":null,"on_thursday":"R","on_friday":null,"start_time":"1/1/1900 13:00","end_time":"1/1/1900 14:15","preferred_name":null},{"id":"641463211d1ed0444011a2ae","year":2018,"semester":"Fall","course_prefix":"HUMA","course_number":200,"course_section":"F","last_name":"Coulter","first_name":"Michael","course_title":"WESTERN CIV: FOUNDATIONS","credit_hours":3,"credit_variation":"N","course_capacity":32,"crs_enrollment":34,"building_code":"HAL","room_code":"308","on_monday":"M","on_tuesday":null,"on_wednesday":"W","on_thursday":null,"on_friday":"F","start_time":"1/1/1900 13:00","end_time":"1/1/1900 13:50","preferred_name":null},{"id":"641463211d1ed0444011a2b9","year":2018,"semester":"Fall","course_prefix":"HUMA","course_number":202,"course_section":"H","last_name":"Barbour","first_name":"Kristin","course_title":"CIV/LITERATURE","credit_hours":3,"credit_variation":"N","course_capacity":30,"crs_enrollment":31,"building_code":"PFAC","room_code":"69","on_monday":null,"on_tuesday":"T","on_wednesday":null,"on_thursday":"R","on_friday":null,"start_time":"1/1/1900 10:05","end_time":"1/1/1900 11:20","preferred_name":null},{"id":"641463211d1ed0444011a2d0","year":2018,"semester":"Fall","course_prefix":"MARK","course_number":204,"course_section":"A","last_name":"Havrilla","first_name":"Laura","course_title":"PRINCIPLES OF MARKETING","credit_hours":3,"credit_variation":"N","course_capacity":32,"crs_enrollment":29,"building_code":"HAL","room_code":"314","on_monday":"M","on_tuesday":null,"on_wednesday":"W","on_thursday":null,"on_friday":"F","start_time":"1/1/1900 11:00","end_time":"1/1/1900 11:50","preferred_name":null},{"id":"641463211d1ed0444011a2d6","year":2018,"semester":"Fall","course_prefix":"MARK","course_number":414,"course_section":"A","last_name":"Kocur","first_name":"Richard","course_title":"SALES","credit_hours":3,"credit_variation":"N","course_capacity":15,"crs_enrollment":13,"building_code":"HAL","room_code":"323","on_monday":null,"on_tuesday":"T","on_wednesday":null,"on_thursday":"R","on_friday":null,"start_time":"1/1/1900 11:30","end_time":"1/1/1900 12:45","preferred_name":"Rich"}]
    // const active: ICourse[] = [];
    // const tentative: ICourse[] = [];
    const [schedule, setSchedule] = useState<ISchedule>({activeCourses:active, tentativeCourses:tentative})

    const removeCourse = (courseId : string, sched : string) => {
        console.log(`Remove course :${courseId} ${schedule}`)
        let currSchedule: ICourse[];
        if (sched === "active") {
            currSchedule = schedule.activeCourses
        } else {
            currSchedule = schedule.tentativeCourses
        }
        currSchedule.forEach(function(elem : ICourse, index : number) {
            if (elem["id"] === courseId) {
                currSchedule.splice(index, 1);
            }
        });
        setSchedule({activeCourses: schedule.activeCourses, tentativeCourses: schedule.tentativeCourses})
    }
    const addCourse = (course: ICourse, sched : string) => {
        console.log("ADD COURSE")
        if (sched === "active") {
            schedule.activeCourses.push(course);
        } else {
            schedule.tentativeCourses.push(course);
        }
    }
    // const addCourseToSchedule = ()

    return (
    <div className="App">
        <AnimatePresence mode={"wait"}>
          <Routes location={location} key={location.pathname}>
            {/*<Route path="/" element={<Home />} />*/}
            <Route path="/" element={<Home schedule={schedule}
                                           setSchedule={setSchedule}
                                           removeCourse={removeCourse}/>}/>
            <Route path="/Search" element={<SearchPage schedule={schedule}
                                                       setSchedule={setSchedule}
                                                       addCourse={addCourse}
                                                       removeCourse={removeCourse}/>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
          </Routes>
        </AnimatePresence>

    </div>
  );
}


export default App;
