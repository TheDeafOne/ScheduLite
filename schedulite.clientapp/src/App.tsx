import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './screens/HomeScreen/HomeScreen';
import SearchPage from "./screens/SearchScreen/SearchPage";
import { AnimatePresence } from "framer-motion";
import ISchedule from "./types/schedule.type";
import ICourse from "./types/course.type";
import Profile from "./screens/ProfileScreen/profile.screen"
import Signup from "./screens/SignupScreen/signup.screen";
import Login from "./screens/LoginScreen/login.screen";
import NavBar from "./components/NavBar/NavBar"

function App() {
    const location = useLocation();
    const active: ICourse[] = [];
    const tentative: ICourse[] = [];
    const [schedule, setSchedule] = useState<ISchedule>({ activeCourses: active, tentativeCourses: tentative })
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const removeCourse = (courseId: string, sched: string) => {
        console.log(`Remove course :${courseId} ${schedule}`)
        let currSchedule: ICourse[];
        if (sched === "active") {
            console.log("active here")
            currSchedule = schedule.activeCourses
        } else {
            console.log("tentative here")
            currSchedule = schedule.tentativeCourses
        }
        currSchedule.forEach(function (elem: ICourse, index: number) {
            if (elem["id"] === courseId) {
                currSchedule.splice(index, 1);
            }
        });
        setSchedule({ activeCourses: schedule.activeCourses, tentativeCourses: schedule.tentativeCourses })
    }
    const addCourse = (course: ICourse, sched: string) => {
        console.log("ADD COURSE")
        if (sched === "active") {
            schedule.activeCourses.push(course);
        } else {
            schedule.tentativeCourses.push(course);
        }
    }
    // const addCourseToSchedule = ()

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (userStr)
            setLoggedIn(true);
    }, [])

    const DefaultRoutes = () => {
        return (
            <div>
                <NavBar loggedIn={loggedIn} />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                schedule={schedule}
                                setSchedule={setSchedule}
                                removeCourse={removeCourse}
                            />
                        }
                    />
                    <Route
                        path="/Search"
                        element={
                            <SearchPage
                                schedule={schedule}
                                setSchedule={setSchedule}
                                addCourse={addCourse}
                                removeCourse={removeCourse}
                            />
                        }
                    />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
        </div>
        )
    }




    return (
        <div className="App">
            <AnimatePresence mode={"wait"}>
                <Routes location={location} key={location.pathname}>
                    {/*<Route path="/" element={<Home />} />*/}
                    <Route path="/signin" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/*" Component={DefaultRoutes} />
                </Routes>
            </AnimatePresence>

        </div>
    );
}


export default App;
