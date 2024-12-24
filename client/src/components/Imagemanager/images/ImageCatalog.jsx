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
import { LinearProgress } from "@mui/material";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row(props) {
  const { row } = props;

  const history = useHistory();

  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row">
          {row._id.slice(row._id.length - 8)}
        </TableCell>
        <TableCell>{row.repo}</TableCell>
        <TableCell>{row.tag}</TableCell>
        <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
        <TableCell>
          <Button
            className="button button-primary"
            style={{
              marginRight: "1rem",
              marginBottom: "1rem",
              boxShadow: "0px 4px 6px 0px rgba(0,0,0,0.6)",
            }}
            onClick={() => {
              history.push({
                pathname: "/imagemanager/create",
                state: {
                  customBaseImage: row.tag,
                },
              });
            }}
          >
            Use Image
          </Button>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export const CreationInfo = () => {
  const [images, setImages] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const history = useHistory();
  useEffect(() => {
    setLoading(true);
    axios.get("/api/image/images/all").then((response) => {
      setImages(response.data);
      setLoading(false);
    });
    console.log(images);
  }, []);

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <TableContainer>
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography component="h2" variant="h5">
            Image Catalog
          </Typography>
          <Button
            className="button button-primary"
            variant="contained"
            onClick={() => history.push("/imagemanager/create")}
          >
            create Image
          </Button>
        </div>
        <hr />
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Image Name</TableCell>
              <TableCell>Tag</TableCell>
              <TableCell>Created On</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {images && images.map((row) => <Row key={row.name} row={row} />)}
          </TableBody>
        </Table>
        {loading && <LinearProgress />}
      </TableContainer>
    </Container>
  );
};
