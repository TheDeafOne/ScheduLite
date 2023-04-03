import React, { useState, useEffect, useContext } from 'react';
import './styles/App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './screens/HomeScreen/HomeScreen';
import SearchPage from "./screens/SearchScreen/SearchPage";
import { AnimatePresence, useTransform } from "framer-motion";
import ISchedule from "./types/schedule.type";
import ICourse from "./types/course.type";
import Profile from "./screens/ProfileScreen/profile.screen"
import Signup from "./screens/SignupScreen/signup.screen";
import Login from "./screens/LoginScreen/login.screen";
import NavBar from "./components/NavBar/NavBar"
import Modal from 'react-modal';
import { UserContext, UserContextType } from './context/UserContext';
import IUser from './types/user.type';
import { ScheduleProvider } from './context/ScheduleContext';
import BlockPage from './screens/ScheduleSelectionScreen/ScheduleSelectionScreen';
import AuthService from './services/auth.service';
import SetScheduleModal from './components/Modals/SetScheduleModal';

Modal.setAppElement('#root');

function App() {
    const { setUser } = useContext(UserContext) as UserContextType;
    const location = useLocation();
    const active: ICourse[] = [];
    const tentative: ICourse[] = [];
    const [schedule, setSchedule] = useState<ISchedule>({ activeCourses: active, tentativeCourses: tentative, scheduleName: "new", year:"2018", semester: "Spring" })
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modal, setModal] = useState(null);


    const customModalStyles = {
        content: {
          top: '50%',
          left: '50%',
          width: '50%',
        //   right: 'auto',
        //   bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
      
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
        setSchedule({ activeCourses: schedule.activeCourses, tentativeCourses: schedule.tentativeCourses, scheduleName: "new", year:"2018", semester: "Spring" })
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
        if (userStr) {
            let user: IUser = JSON.parse(userStr);
            AuthService.login(user.username, user.password);
            const newUserStr = localStorage.getItem("user");
            if (newUserStr !== null) {
                user = JSON.parse(newUserStr);
            }

            // console.log(user);
            setUser(user);
        }
        
    }, [])

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        console.log("after open model");
    }

    function closeModal() {
        setIsOpen(false);
    }

    const DefaultRoutes = () => {
        return (
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    contentLabel="modal"
                    shouldCloseOnEsc={true}
                    shouldCloseOnOverlayClick={true}
                    style={customModalStyles}>
                        {modal}
                </Modal>
                <NavBar />
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
                    <Route path="/schedule-selection" element={<BlockPage setIsOpen={setIsOpen} setModal={setModal} />} />
                </Routes>
            </div>
        )
    }




    return (
        <ScheduleProvider>
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

        </ScheduleProvider>
    );
}


export default App;
