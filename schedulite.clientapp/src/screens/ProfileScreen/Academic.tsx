import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';

const AcademicInfo = () => {
  const mockMajors = [
    { id: 1, name: 'Computer Science' },
    { id: 2, name: 'Mathematics' },
    { id: 3, name: 'Physics' },
  ];

  const mockMinors = [
    { id: 1, name: 'Business Administration' },
    { id: 2, name: 'Psychology' },
    { id: 3, name: 'Sociology' },
  ];

  const mockAdvisors = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'David Johnson' },
  ];

  const handleMajorChange = (event: { target: { value: any; }; }) => {
    console.log(event.target.value);
  };

  const handleMinorChange = (event: { target: { value: any; }; }) => {
    console.log(event.target.value);
  };

  const handleGradYearChange = (event: { target: { value: any; }; }) => {
    console.log(event.target.value);
  };

  const handleAdvisorChange = (event: { target: { value: any; }; }) => {
    console.log(event.target.value);
  };

  const handleDegreeTypeChange = (event: { target: { value: any; }; }) => {
    console.log(event.target.value);
  };

  const handleStudentIdChange = (event: { target: { value: any; }; }) => {
    console.log(event.target.value);
  };

  const handleGpaChange = (event: { target: { value: any; }; }) => {
    console.log(event.target.value);
  };

  return (
    <div>
      <h1 style={{ color: "white" }}>Academic Info</h1>
      <div style={{ padding: "10px 20px 20px 20px" }}>
        <FormControl style={{ minWidth: "200px", marginBottom: "10px" }}>
          <InputLabel id="major-label" style={{ color: "white" }}>Major</InputLabel>
          <Select
            labelId="major-label"
            id="major"
            value={null}
            onChange={handleMajorChange}
            style={{ color: "white" }}
          >
            {mockMajors.map((major) => (
              <MenuItem key={major.id} value={major.id}>
                {major.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl style={{ minWidth: "200px", marginBottom: "10px" }}>
          <InputLabel id="minor-label" style={{ color: "white" }}>Minor</InputLabel>
          <Select
            labelId="minor-label"
            id="minor"
            value={null}
            onChange={handleMinorChange}
            style={{ color: "white" }}
          >
            {mockMinors.map((minor) => (
              <MenuItem key={minor.id} value={minor.id}>
                {minor.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl style={{ minWidth: "200px", marginBottom: "10px" }}>
          <InputLabel id="grad-year-label" style={{ color: "white" }}>Graduation Year</InputLabel>
          <Select
            labelId="grad-year-label"
            id="grad-year"
            value={null}
            onChange={handleGradYearChange}
            style={{ color: "white" }}
          >
            <MenuItem value="2017">2017</MenuItem>
            <MenuItem value="2018">2018</MenuItem>
            <MenuItem value="2019">2019</MenuItem>
            <MenuItem value="2020">2020</MenuItem>
            <MenuItem value="2021">2021</MenuItem>
            <MenuItem value="2022">2022</MenuItem>
            <MenuItem value="2023">2023</MenuItem>
            <MenuItem value="2024">2024</MenuItem>
            <MenuItem value="2025">2025</MenuItem>
          </Select>
        </FormControl>

        <FormControl style={{ minWidth: "200px", marginBottom: "10px" }}>
          <InputLabel id="advisor-label" style={{ color: "white" }}>Advisor</InputLabel>
          <Select
            labelId="advisor-label"
            id="advisor"
            value={null}
            onChange={handleAdvisorChange}
            style={{ color: "white" }}
          >
            {mockAdvisors.map((advisor) => (
              <MenuItem key={advisor.id} value={advisor.id}>
                {advisor.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl style={{ minWidth: "200px", marginBottom: "10px" }}>
          <InputLabel id="degree-type-label" style={{ color: "white" }}>Degree Type</InputLabel>
          <Select
            labelId="degree-type-label"
            id="degree-type"
            value={null}
            onChange={handleDegreeTypeChange}
            style={{ color: "white" }}
          >
            <MenuItem value="Bachelor">Bachelor</MenuItem>
            <MenuItem value="Master">Master</MenuItem>
            <MenuItem value="PhD">PhD</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="student-id"
          label="Student ID"
          value=""
          onChange={handleStudentIdChange}
          style={{ color: "white", marginBottom: "10px" }}
        />

        <TextField
          id="gpa"
          label="GPA"
          value=""
          onChange={handleGpaChange}
          style={{ color: "white" }}
        />
      </div>
    </div>
  );
};

export default AcademicInfo;
