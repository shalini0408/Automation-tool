import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import axios from "axios";
import React from "react";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router";
import { parse } from "papaparse";
import { CsvToHtmlTable } from "react-csv-to-table";

export const useStyles = makeStyles((theme) => ({
  inputBx: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  labs: {
    margin: "20px auto",
    maxWidth: "900px",
    // border: "1px solid #e0e0e0",
  },

  title: {
    fontSize: "2rem",
    marginTop: "2rem",
  },
}));

function validateAndExtract(data) {
  console.log(data[0]["first name"]);
  if (data.length <= 1) return false;

  const columnIdxs = {};

  const firstNameIdx = data[0].indexOf("first name");
  if (firstNameIdx === -1) return false;
  columnIdxs["firstNameIdx"] = firstNameIdx;

  const lastNameIdx = data[0].indexOf("last name");
  if (lastNameIdx === -1) return false;
  columnIdxs["lastNameIdx"] = lastNameIdx;

  const SRNIdx = data[0].indexOf("SRN");
  if (SRNIdx === -1) return false;
  columnIdxs["SRNIdx"] = SRNIdx;

  const semesterIdx = data[0].indexOf("semester");
  if (semesterIdx === -1) return false;
  columnIdxs["semesterIdx"] = semesterIdx;

  const sectionIdx = data[0].indexOf("section");
  if (sectionIdx === -1) return false;
  columnIdxs["sectionIdx"] = sectionIdx;

  const branchIdx = data[0].indexOf("branch");
  if (branchIdx === -1) return false;
  columnIdxs["branchIdx"] = branchIdx;

  const emailIdx = data[0].indexOf("email");
  if (emailIdx === -1) return false;
  columnIdxs["emailIdx"] = emailIdx;

  let students = {
    columnIdxs: {
      firstNameIdx,
      lastNameIdx,
      SRNIdx,
      semesterIdx,
      sectionIdx,
      branchIdx,
      emailIdx,
    },
    data: [],
  };

  for (let i = 1; i < data.length - 1; i++) {
    students.data.push({
      firstName: data[i][firstNameIdx],
      lastName: data[i][lastNameIdx],
      SRN: data[i][SRNIdx],
      semester: data[i][semesterIdx],
      section: data[i][sectionIdx],
      branch: data[i][branchIdx],
      email: data[i][emailIdx],
    });
  }

  return students;
}

function csvToString(csvData) {
  let res = "\nfirst name, last name, SRN, semester, section, branch, email\n";

  csvData.data.forEach((elem) => {
    res += `${elem.firstName}, ${elem.lastName}, ${elem.SRN}, ${elem.semester}, ${elem.section}, ${elem.branch}, ${elem.email}\n`;
  });

  return res;
}

const CreateStudentUser = ({ removeRemote, handleChange }) => {
  const classes = useStyles();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [SRN, setSRN] = React.useState("");
  const [semester, setSemester] = React.useState("");
  const [branch, setBranch] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [section, setSection] = React.useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [file, setFile] = React.useState();
  const [csvData, setCSVData] = React.useState();
  const history = useHistory();

  React.useEffect(() => {
    if (file) {
      parse(file, {
        complete: function onComplete(results) {
          const parsedData = validateAndExtract(results.data);
          console.log(file);
          if (parsedData) {
            setCSVData(parsedData);
          } else {
            console.error("CSV not in required format");
          }
        },
      });
    }
  }, [file]);

  const onSubmit = (e) => {
    e.preventDefault();
    const studentData = {
      firstName,
      lastName,
      SRN,
      semester,
      section,
      branch,
      role: "student",
      email,
    };

    console.log(studentData);

    axios
      .post("/api/auth/user", studentData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          enqueueSnackbar("Student Added Successfully", {
            variant: "success",
            autoHideDuration: 2000,
          });
          history.push("/users");
        }
      })
      .catch((err) => {
        enqueueSnackbar("Missing or invalid required params", {
          variant: "error",
          autoHideDuration: 2000,
        });
      });
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" className={classes.title}>
        Add a new student
      </Typography>
      <Typography variant="p" className={classes.description}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis,
        recusandae voluptates!.
      </Typography>

      <div style={{ marginTop: "2rem" }}>
        <label
          htmlFor="csv"
          className="button button-primary"
          style={{ marginLeft: "0" }}
        >
          Upload CSV
        </label>
        <input
          id="csv"
          type="file"
          className="button button-primary"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        {csvData && (
          <div>
            <CsvToHtmlTable
              data={csvToString(csvData)}
              csvDelimiter=","
              tableClassName="table table-striped table-hover"
            />
            <Button
              className="button button-primary"
              style={{ marginRight: "10px" }}
              onClick={() => setCSVData(null)}
            >
              Clear CSV
            </Button>
            <Button
              className="button button-primary"
              onClick={() => {
                // send csvData to backend to create students
                console.log(csvData);
                csvData.data.forEach((elem) => {
                  axios
                    .post("/api/auth/user", elem)
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                });
              }}
            >
              submit
            </Button>
          </div>
        )}
        <Grid container spacing={2} className={classes.labs}>
          <Grid item xs={12} sm={12} className={classes.inputBx}>
            <TextField
              variant="outlined"
              fullWidth
              id="firstName"
              label="First Name"
              type="text"
              name="firstName"
              autoComplete="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={12} className={classes.inputBx}>
            <TextField
              variant="outlined"
              fullWidth
              id="lastName"
              label="Last Name"
              type="text"
              name="lastName"
              autoComplete="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={12} className={classes.inputBx}>
            <TextField
              variant="outlined"
              fullWidth
              id="SRN"
              label="SRN"
              type="text"
              name="SRN"
              autoComplete="system"
              value={SRN}
              onChange={(e) => setSRN(e.target.value)}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={12} className={classes.inputBx}>
            <TextField
              variant="outlined"
              fullWidth
              id="semester"
              label="Semester"
              type="text"
              name="semester"
              autoComplete="system"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={12} className={classes.inputBx}>
            <TextField
              variant="outlined"
              fullWidth
              id="section"
              label="Section"
              type="text"
              name="section"
              autoComplete="system"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={12} className={classes.inputBx}>
            <TextField
              variant="outlined"
              fullWidth
              id="Branch"
              label="Branch Name"
              type="text"
              name="Branch"
              autoComplete="image"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={12} className={classes.inputBx}>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email Address"
              type="text"
              name="email"
              autoComplete="category"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              color="primary"
            />
          </Grid>
          <Button
            variant="contained"
            style={{ margin: "10px", float: "right" }}
            className="button button-primary"
            onClick={onSubmit}
          >
            Add Student
          </Button>
        </Grid>
      </div>
    </Container>
  );
};

export default CreateStudentUser;
