import { Alert, Button, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { UserContext, UserContextType } from "../../context/UserContext";
import AuthService from '../../services/auth.service';

import './SignupScreen.scss';

const validationSchema = yup.object().shape({
  username: yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters'),
  email: yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters')
});

const Signup = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext) as UserContextType
  const [message, setMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      AuthService.register(
        values.username,
        values.email,
        values.password
      ).then(() => {
        AuthService.login(values.username, values.password).then(() => {
          setUser(AuthService.getCurrentUser());
          navigate("/schedule-selection");
        })
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
  });

  return (
    <div className="auth-container">
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
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                sx={{ paddingBottom: "10px" }}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
          <span className="auth-link" onClick={() => { navigate('/login') }}>
            Already have an account? Log In
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;