import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthService from "../../services/auth.service";

const Login = () => {
    const [redirect, setRedirect] = useState<string>();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    
    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        if (currentUser) {
            const navigate = useNavigate();
            navigate("/profile");
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
                setRedirect("/profile");
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
        
        <div>
          <Formik
            initialValues={{username:"",password:""}}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
        >
            <Form>
                <div>
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
                  {/* {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )} */}
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
        </div>
    )
}

export default Login