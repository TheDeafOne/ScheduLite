import React, { useState, useEffect, useContext } from 'react';
import './styles/App.scss';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './screens/HomeScreen/HomeScreen';
import SearchPage from "./screens/SearchScreen/SearchPage";
import { AnimatePresence, useTransform } from "framer-motion";
import ISchedule from "./types/schedule.type";
import ICourse from "./types/course.type";
import Profile from "./screens/ProfileScreen/ProfileScreen"
import Signup from "./screens/SignupScreen/SignupScreen";
import Login from "./screens/LoginScreen/LoginScreen";
import NavBar from "./components/NavBar/NavBar"
import Modal from 'react-modal';
import { UserContext, UserContextType } from './context/UserContext';
import IUser from './types/user.type';
import { ScheduleProvider } from './context/ScheduleContext';
import BlockPage from './screens/ScheduleSelectionScreen/ScheduleSelectionScreen';
import AuthService from './services/auth.service';
import SetScheduleModal from './components/Modals/SetScheduleModal';
import {useTheme, createTheme, ThemeProvider, CssBaseline} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import {getDesignTokens} from "./styles/CustomPalette";
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';

Modal.setAppElement('#root');

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export interface linkedScheduleObjType {linkedSchedule: boolean, setLinkedSchedule: React.Dispatch<React.SetStateAction<boolean>>}

// const defaultTheme = {
//
// }
function AppBody() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    const { setUser } = useContext(UserContext) as UserContextType;
    const location = useLocation();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modal, setModal] = useState(null);
    const [linkedSchedule, setLinkedSchedule] = useState(false);
    const [panelVisible, setPanelVisible] = useState<boolean>(true);

    let linkedScheduleObj : linkedScheduleObjType = {
        linkedSchedule: linkedSchedule,
        setLinkedSchedule: setLinkedSchedule
    }
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

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            let user: IUser = JSON.parse(userStr);
            AuthService.login(user.username, user.password);
            const newUserStr = localStorage.getItem("user");
            if (newUserStr !== null) {
                user = JSON.parse(newUserStr);
            }

            // THIS IS HAPPENING EVERY TIME BRUH
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
                    portalClassName="modal"
                    shouldCloseOnEsc={true}
                    shouldCloseOnOverlayClick={true}
                    style={{
                        overlay: {
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(17,26,29,0.62)'
                        },
                        content: {
                            top: '50%',
                            left: '50%',
                            width: '30%',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            border: '1px solid #ccc',
                            background: '#415561',
                            overflow: 'auto',
                            WebkitOverflowScrolling: 'touch',
                            borderRadius: '10px',
                            outline: 'none',
                            padding: '20px'
                        }
                    }}
                    >
                        {modal}
                </Modal>
                <NavBar />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home linkedScheduleObj={linkedScheduleObj} panelVisible={panelVisible} setPanelVisible={setPanelVisible}/>
                        }
                    />
                    <Route
                        path="/Search"
                        element={
                            <SearchPage linkedSchedule={false} panelVisible={panelVisible} setPanelVisible={setPanelVisible}/>
                        }
                    />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/schedule-selection" element={<BlockPage setIsOpen={setIsOpen} setModal={setModal} />} />
                </Routes>
            </div>
        )
    }

    return (
        // <ScheduleProvider>
            <div className="App" id={"app"}>
                {/*<div className={"main-div"}>*/}
                    <AnimatePresence mode={"wait"}>
                        <Routes location={location} key={location.pathname}>
                            {/*<Route path="/" element={<Home />} />*/}
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/*" Component={DefaultRoutes} />
                        </Routes>
                    </AnimatePresence>

                {/*</div>*/}

            </div>

        // </ScheduleProvider>
    );
}
function App() {
    const [mode, setMode] = React.useState<'light' | 'dark'>('dark');

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <AppBody />
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
