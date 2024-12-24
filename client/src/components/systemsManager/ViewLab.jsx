import { Button, Container } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import axios from "axios";
import { CircularProgress } from "@mui/material";

function Row(props) {
  const { row, checkLoading } = props;

  return (
    <React.Fragment>
      <TableRow>
        <TableCell component="th" scope="row">
          1
        </TableCell>
        <TableCell>{row.systemName}</TableCell>
        <TableCell>{row.userName}</TableCell>
        <TableCell>{row.OS}</TableCell>
        <TableCell>{row.ipAddress}</TableCell>
        <TableCell>{row.ram}</TableCell>
        <TableCell>{row.rom}</TableCell>
        {row.loading === true ? (
          <TableCell>
            <CircularProgress />
          </TableCell>
        ) : (
          <TableCell>{row.health}</TableCell>
        )}
      </TableRow>
    </React.Fragment>
  );
}

const ViewLab = (props) => {
  const [systems, setSystems] = React.useState(
    props.location.state.systems.map((system) => {
      return {
        ...system,
        health: "unchecked",
        loading: false,
      };
    })
  );

  const labId = props.location.state.labId;

  const healthCheck = (system, labId) => {
    system.loading = true;
    setSystems([...systems]);
    axios
      .post(`/api/deployment/healthcheck`, {
        labId: labId,
        systemId: system._id,
      })
      .then((res) => {
        if (res.data.result.success === true) {
          system.health = "Healthy";
        } else {
          system.health = "Unhealthy";
        }
        system.loading = false;
        setSystems([...systems]);
      });
  };

  const handleHealthCheck = (labId) => {
    systems.forEach((system) => {
      healthCheck(system, labId);
    });
  };
  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <TableContainer>
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography component="h2" variant="h5">
            Systems
          </Typography>
          <Button
            className="button button-primary"
            variant="contained"
            style={{ width: "180px" }}
            onClick={() => handleHealthCheck(labId)}
          >
            Health Check
          </Button>
        </div>
        <hr />
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>System Name</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>OS</TableCell>
              <TableCell>IP Address</TableCell>
              <TableCell>RAM</TableCell>
              <TableCell>ROM</TableCell>
              <TableCell>health</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {systems && systems.map((row) => <Row row={row} key={row._id} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ViewLab;
