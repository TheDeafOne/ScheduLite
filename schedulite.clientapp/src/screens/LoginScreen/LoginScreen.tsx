import { Alert, Button, Grid, Link, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import * as Yup from "yup";
import "./LoginScreen.scss";

import { UserContext, UserContextType } from "../../context/UserContext";
import AuthService from "../../services/auth.service";

const Login = () => {
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext) as UserContextType



    useEffect(() => {
        if (AuthService.getCurrentUser() !== null) {
            navigate("/schedule-selection", { replace: true });
        }
        // eslint-disable-next-line
    }, [])

    function validationSchema() {
        return Yup.object().shape({
            username: Yup.string().required("This field is requires"),
            password: Yup.string().required("This field is required")
        });
    }

    function handleLogin(username: string, password: string) {
        setMessage("");
        AuthService.login(username, password).then(
            () => {
                setUser(AuthService.getCurrentUser());
                navigate("/schedule-selection", { replace: true });
            },
            error => {
                const resMessage = (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) || error.message || error.toString();

                setMessage(resMessage);
            }
        );
    }


    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleLogin(values.username, values.password);
        }
    });

    return (
        <div className='auth-container'>
            <div className={"auth-back-button-container"}>
                <div className="abs-back-container">
                    <button onClick={() => {navigate('/')}} className={"back-button"}><ArrowBackIcon /></button>
                    <div className={"back-button-title"}>
                        Back to Schedule
                    </div>
                </div>
            </div>
            
            <div className="card-container">
    
                <div className="form-container">
                    <form onSubmit={formik.handleSubmit}>
                        <Grid>
                            <TextField
                                id="username"
                                name="username"
                                label="Username"
                                variant="outlined"
                                sx={{ paddingBottom: "10px" }}
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                            />
                        </Grid>
                        <Grid>
                            <TextField
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                sx={{ paddingBottom: "10px" }}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        </Grid>
                        {message !== "" && <Alert sx={{ marginBottom: "10px" }} severity="error">{message}</Alert>}
                        <Button sx={{ marginBottom: "10px" }} color="primary" variant="contained" fullWidth type="submit">
                            Submit
                        </Button>
                    </form>
                    <span className="auth-link" onClick={() => {navigate('/signup')}}>
                        Don't have an account? Sign Up
                    </span>
                </div>
    
            </div>
        </div>
    )
}

export default Login