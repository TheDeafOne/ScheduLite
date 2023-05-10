import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import IUser from "../../types/user.type";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Button } from "@mui/material";

interface Personal {
  firstName: string;
  lastName: string;
  major: string;
  minor: string;
  gradYear: number;
}

const Personal = () => {
  const [Personal, setPersonal] = useState<Personal>({
    firstName: "",
    lastName: "",
    major: "",
    minor: "",
    gradYear: 0,
  });


  const handleInputChange = (event: SelectChangeEvent<number>) => {
    const name = event.target.name;
    const value = event.target.value;
  
    setPersonal((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(Personal);
  };

  return (
    <>
      <h1 style={{ color: "white" }}>User Settings</h1>
      {/*<div style={{ padding: "10px 20px 20px 20px" }}></div>*/}
      <form onSubmit={handleSubmit}>
        <div className={"form-item"}>
          {/*<label htmlFor="firstName" style={{ color: "white", fontSize: "16px", verticalAlign: "middle" }}>First Name: </label>*/}
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
          />
        </div>
        <div className={"form-item"}>
          {/*<label htmlFor="lastName" style={{ color: "white", fontSize: "16px", verticalAlign: "middle" }}>Last Name: </label>*/}
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
          />
        </div>
        <div className={"form-item"}>
          {/*<label htmlFor="Email" style={{ color: "white", fontSize: "16px", verticalAlign: "middle" }}>Email: </label>*/}
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
        </div>
        <div className={"form-item"}>
          {/*<label htmlFor="Password" style={{ color: "white", fontSize: "16px", verticalAlign: "middle" }}>Password: </label>*/}
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
        </div>
        

        <Button type="submit">Save Personal</Button>
      </form>
    </>
  );

  
};

export default Personal;
