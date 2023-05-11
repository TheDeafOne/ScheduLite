import { ThemeProvider, createTheme } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Route, Routes, useLocation } from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";
import { UserContext, UserContextType } from './context/UserContext';
import Home from './screens/HomeScreen/HomeScreen';
import Login from "./screens/LoginScreen/LoginScreen";
import Profile from "./screens/ProfileScreen/ProfileScreen";
import BlockPage from './screens/ScheduleSelectionScreen/ScheduleSelectionScreen';
import SearchPage from "./screens/SearchScreen/SearchPage";
import Signup from "./screens/SignupScreen/SignupScreen";
import AuthService from './services/auth.service';
import './styles/App.scss';
import { getDesignTokens } from "./styles/CustomPalette";
import IUser from './types/user.type';
import './components/Modals/ScheduleModal.scss';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';

Modal.setAppElement('#root');

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export interface linkedScheduleObjType { linkedSchedule: boolean, setLinkedSchedule: React.Dispatch<React.SetStateAction<boolean>> }

// const defaultTheme = {
//
// }
function AppBody() {
    const { setUser } = useContext(UserContext) as UserContextType;
    // const { setIsOpen, setModal } = useContext(ScheduleContext) as ScheduleContextType

    const location = useLocation();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modal, setModal] = useState(null);
    const [linkedSchedule, setLinkedSchedule] = useState(false);
    const [panelVisible, setPanelVisible] = useState<boolean>(true);

    let linkedScheduleObj: linkedScheduleObjType = {
        linkedSchedule: linkedSchedule,
        setLinkedSchedule: setLinkedSchedule
    }
    useEffect(() => {
        window.addEventListener("beforeunload", alertUser);
        return () => {
            window.removeEventListener("beforeunload", alertUser);
        };
    }, []);

    const alertUser = (e: any) => {
        e.preventDefault();
        e.returnValue = "";
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
        // eslint-disable-next-line
    }, [])

    function afterOpenModal() {
        console.log("after open model");
    }

    function closeModal() {
        setIsOpen(false);
    }

    const DefaultRoutes = () => {
        return (
            <div className={"main-app-body"}>
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
                            height: "50%",
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            border: '1px solid #ccc',
                            background: '#254058',
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
                            <Home linkedScheduleObj={linkedScheduleObj} panelVisible={panelVisible} setPanelVisible={setPanelVisible} />
                        }
                    />
                    <Route
                        path="/Search"
                        element={
                            <SearchPage linkedSchedule={false} panelVisible={panelVisible} setPanelVisible={setPanelVisible} setIsOpen={setIsOpen} setModal={setModal} />
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
