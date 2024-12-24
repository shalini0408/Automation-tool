import { Button, Container, LinearProgress } from "@mui/material";
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
import { Link } from "react-router-dom";

function Row(props) {
  const { row } = props;

  return (
    <React.Fragment>
      <TableRow>
        <TableCell align="center">{row._id.slice(12)}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.branch}</TableCell>
        <TableCell>{row.category}</TableCell>
        <Link
          to={{
            pathname: "/systems/viewlab",
            state: {
              systems: row.systems,
              labId: row._id,
            },
          }}
          style={{ textDecoration: "none" }}
        >
          <Button
            style={{ marginTop: "5px" }}
            className="button button-primary"
          >
            view lab
          </Button>
        </Link>
      </TableRow>
    </React.Fragment>
  );
}

export const ViewRemotes = () => {
  const [Labs, setLabs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    axios.get("/api/labs").then((res) => {
      setLabs(res.data);
      setLoading(false);
    });
  }, []);
  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <TableContainer>
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography component="h2" variant="h5">
            Labs
          </Typography>
          <Button
            className="button button-primary"
            variant="contained"
            onClick={() => history.push("/systems/addLab")}
          >
            Add new Lab
          </Button>
        </div>
        <hr />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell>Lab Name</TableCell>
              <TableCell>Branch Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && Labs.map((row) => <Row key={row.name} row={row} />)}
          </TableBody>
        </Table>
        {loading && <LinearProgress />}
      </TableContainer>
    </Container>
  );
};
