import { Button, Container } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect } from "react";
import { useHistory } from "react-router";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row(props) {
  const { row, setStudents } = props;

  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row">
          1
        </TableCell>
        <TableCell>{row.firstName}</TableCell>
        <TableCell>{row.lastName}</TableCell>
        <TableCell>{row.SRN}</TableCell>
        <TableCell>{row.semester}</TableCell>
        <TableCell>{row.branch}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>
          <Button
            className="button button-primary"
            style={{
              marginRight: "1rem",
              marginBottom: "1rem",
              boxShadow: "0px 4px 6px 0px rgba(0,0,0,0.6)",
            }}
            onClick={() => {
              axios.delete(`/api/auth/user/${row._id}`).then((res) => {
                console.log(res);
              });
            }}
          >
            remove
          </Button>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export const ViewStudents = () => {
  const [students, setStudents] = React.useState([]);

  const history = useHistory();
  useEffect(() => {
    axios.get("/api/auth/user/student").then((response) => {
      setStudents(response.data);
    });
  }, []);

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <TableContainer>
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography component="h2" variant="h5">
            Students
          </Typography>
          <Button
            className="button button-primary"
            variant="contained"
            onClick={() => history.push("/users/create/student")}
          >
            Add new student
          </Button>
        </div>
        <hr />
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>SRN</TableCell>
              <TableCell>semester</TableCell>
              <TableCell>branch</TableCell>
              <TableCell>email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students &&
              students.map((row) => (
                <Row key={row.name} row={row} setStudents={setStudents} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
