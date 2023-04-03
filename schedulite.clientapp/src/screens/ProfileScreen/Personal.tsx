import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import IUser from "../../types/user.type";

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


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setPersonal({ ...Personal, [name]: name === 'gradYear' ? parseInt(value, 10) : value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(Personal);
  };

  return (
    <>
      {/* <Header />  */}
      <div style={{ padding: "80px 20px 20px 20px" }}></div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={Personal.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={Personal.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="major">Major:</label>
          <input
            type="text"
            id="major"
            name="major"
            value={Personal.major}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="minor">Minor:</label>
          <input
            type="text"
            id="minor"
            name="minor"
            value={Personal.minor}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="gradYear">Graduation Year:</label>
          <select
            id="gradYear"
            name="gradYear"
            value={Personal.gradYear}
            onChange={handleInputChange}
          >
            <option value="">Select a year</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>
        <button type="submit">Save Personal</button>
      </form>
    </>
  );
};

export default Personal;
