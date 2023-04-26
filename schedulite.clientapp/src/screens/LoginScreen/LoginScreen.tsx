import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { TextField } from "@mui/material";
import * as Yup from "yup";
import "./LoginScreen.scss"

import AuthService from "../../services/auth.service";
import {UserContext, UserContextType} from "../../context/UserContext";

const Login = () => {
    const [loading, setLoading] = useState<boolean>(false);
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

    function handleLogin(formValue: {username: string; password: string }) {
        const {username, password} = formValue;
        setMessage("");
        setLoading(true);
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
                
                setLoading(false);
                setMessage(resMessage);
            }
        );
    }


    return (
        
        <div className={"login"}>
          <Formik
            initialValues={{username:"",password:""}}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
        >
            <Form>
                <div>
                    {/*<TextField label={"username"}>*/}
                    {/*</TextField>*/}
                    <label htmlFor="username">username</label>
                    <Field name="username" type="text" />
                    <ErrorMessage
                        name="username"
                        component="div"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <Field name="password" type="password" className="form-control" />
                    <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                    />
                </div>
                <div className="form-group">
                <button type="submit" disabled={loading}>
                  <span>Login</span>
                </button>
              </div>
              {message && (
                <div>
                  <div role="alert">
                    {message}
                  </div>
                </div>
              )}
            </Form>
        </Formik>
        <label>
            need an account?
        </label>
        <button onClick={() => {navigate("/signup")}}>sign up</button>
        </div>
    )
}

export default Login