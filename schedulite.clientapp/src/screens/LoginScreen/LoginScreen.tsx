import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { Link, TextField, Button, Grid, Alert } from '@mui/material';

import * as Yup from "yup";
import "./LoginScreen.scss"

import AuthService from "../../services/auth.service";
import {UserContext, UserContextType} from "../../context/UserContext";

const Login = () => {
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext) as UserContextType

    

    useEffect(() => {
        if (AuthService.getCurrentUser() !== null) {
            navigate("/profile",{replace:true});
        }
    },[])

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
                navigate("/profile",{replace:true});
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
        
        <div className="card-container">
       
            <div className="form-container">
                <form onSubmit={formik.handleSubmit}>
                <Grid>
                    <TextField
                    id="username"
                    name="username"
                    label="Username"
                    variant="outlined"
                    sx={{paddingBottom: "10px"}}
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
                    sx={{paddingBottom: "10px"}}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    />
                </Grid>
                {message !== "" && <Alert sx={{marginBottom: "10px"}} severity="error">{message}</Alert>}
                <Button sx={{marginBottom: "10px"}} color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
                </form>
                <Link href="/signup">
                    Don't have an account? Sign Up
                </Link>
            </div>

        </div>
    )
}

export default Login