import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import { Card, Link, TextField, Button, Grid, CardContent } from '@mui/material';
import * as yup from 'yup';

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
    .min(4, 'Password must be at least 4 characters')
    .max(40, 'Password must not exceed 40 characters')
});

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="card-container">
      <Card>
        <CardContent>
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
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  sx={{paddingBottom: "10px"}}
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
                  sx={{paddingBottom: "10px"}}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Button color="primary" variant="contained" fullWidth type="submit">
                Submit
              </Button>
            </form>
            <Link href="/login">
              Already have an account? Log In Here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;