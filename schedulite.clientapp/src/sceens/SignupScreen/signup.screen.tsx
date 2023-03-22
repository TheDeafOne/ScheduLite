import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthService from '../../services/auth.service';

const Signup = () => {
    const [successful, setSuccessful] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    function validationSchema() {
        return Yup.object().shape({
          username: Yup.string()
            .test(
              "len",
              "The username must be between 3 and 20 characters.",
              (val: any) =>
                val &&
                val.toString().length >= 3 &&
                val.toString().length <= 20
            )
            .required("This field is required!"),
          email: Yup.string()
            .email("This is not a valid email.")
            .required("This field is required!"),
          password: Yup.string()
            .test(
              "len",
              "The password must be between 6 and 40 characters.",
              (val: any) =>
                val &&
                val.toString().length >= 6 &&
                val.toString().length <= 40
            )
            .required("This field is required!"),
        });
      }
    
      function handleRegister(formValue: { username: string; email: string; password: string }) {
        const { username, email, password } = formValue;
    
        setMessage("");
        setSuccessful(false);

        AuthService.register(
          username,
          email,
          password
        ).then(
          response => {
            setMessage(response.data.message);
            setSuccessful(true);
          },
          error => {
            const resMessage = (
                error.response &&
                error.response.data &&
                error.response.data.message
                ) || error.message || error.toString();
            
            setSuccessful(false);
            setMessage(resMessage);
          }
        );
      }

      return (
        <div>
            <div>
                <Formik
                    initialValues={{username:"",email:"",password:""}}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                >
                <Form>
                    {!successful && (
                        <div>
                        <div>
                            <label htmlFor="username"> Username </label>
                            <Field name="username" type="text" />
                            <ErrorMessage
                                name="username"
                                component="div"
                            />
                        </div>

                        <div>
                            <label htmlFor="email"> Email </label>
                            <Field name="email" type="email" />
                            <ErrorMessage
                                name="email"
                                component="div"
                            />
                        </div>

                        <div>
                            <label htmlFor="password"> Password </label>
                            <Field
                                name="password"
                                type="password"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                            />
                        </div>
                            <div>
                                <button type="submit">Sign Up</button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div>
                            <div
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                </Form>
            </Formik>
            </div>
        </div>
      )
}

export default Signup