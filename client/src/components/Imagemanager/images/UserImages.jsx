import { Button, Container, LinearProgress, TableBody } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import { Box } from "@mui/material";
import axios from "axios";
import jwt from "jsonwebtoken";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ALLOCATOR_IP = "13.232.217.78:3000";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

export const CreationForm_running = () => {
  const [myimages, setMyImages] = React.useState(undefined);
  const [myContainers, setMyContainers] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [tag, setTag] = React.useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleCommit = (e, container) => {
    e.preventDefault();

    axios
      .post(`/api/image/containers/save`, {
        containerId: container.containerId,
        tag: tag,
        userId: container.userId,
      })
      .then((res) => {
        enqueueSnackbar("new image created", {
          variant: "success",
          autoHideDuration: 2000,
        });
        setOpen(false);
      })
      .catch((err) => {
        enqueueSnackbar("error creating image", {
          variant: "error",
          autoHideDuration: 2000,
        });
        setOpen(false);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getImages = () => {
    const userData = jwt.verify(
      JSON.parse(localStorage.getItem("user")),
      "SECRET"
    );
    axios.get(`/api/image/images?userId=${userData.id}`).then((response) => {
      console.log(response.data);
      setMyImages(
        response.data.userImages.map((image) => {
          return {
            ...image,
            type: "image",
          };
        })
      );
      setLoading(false);
    });
  };

  const getContainers = () => {
    const userData = jwt.verify(
      JSON.parse(localStorage.getItem("user")),
      "SECRET"
    );

    axios
      .get(`/api/image/containers?userId=${userData.id}`)
      .then((response) => {
        console.log(response.data);
        setMyContainers(
          response.data.map((container) => {
            return {
              ...container,
              type: "container",
            };
          })
        );
        setLoading(false);
      });
  };

  function Row(props) {
    const { row, setContainer, type } = props;
    const [opend, setOpend] = useState(false);
    const classes = useRowStyles();

    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell component="th" scope="row">
            {type}
          </TableCell>
          <TableCell>{row.baseImage}</TableCell>
          <TableCell> {type === "image" ? row.repo : "--"}</TableCell>
          <TableCell>
            {type === "container" ? row.containerId.slice(0, 11) : "--"}
          </TableCell>
          <TableCell>{new Date(row.createdAt).toLocaleString()}</TableCell>
          <TableCell>{row.state}</TableCell>
          <TableCell>
            {row.state === "Running" && (
              <Button
                className="button"
                style={{
                  padding: "5px",
                  height: "30px",
                  marginRight: "5px",
                  marginBottom: "5px",
                }}
                onClick={() => setOpen(true)}
              >
                Commit
              </Button>
            )}
            {row.state === "Running" ? (
              <Button
                className="button"
                style={{
                  padding: "5px",
                  height: "30px",
                  marginRight: "5px",
                  marginBottom: "5px",
                }}
                onClick={() => {
                  axios
                    .post(`/api/image/containers/stop`, {
                      containerId: row.containerId,
                    })
                    .then((res) => {
                      enqueueSnackbar("container stopped", {
                        variant: "success",
                        autoHideDuration: 2000,
                      });
                      getContainers();
                    })
                    .catch((err) => {
                      enqueueSnackbar("error stopping container", {
                        variant: "error",
                        autoHideDuration: 2000,
                      });
                    });
                }}
              >
                stop
              </Button>
            ) : (
              <Button
                className="button"
                style={{
                  padding: "5px",
                  height: "30px",
                  marginRight: "5px",
                  marginBottom: "5px",
                }}
                onClick={() => {
                  axios
                    .post(`/api/image/containers/start`, {
                      containerId: row.containerId,
                    })
                    .then((res) => {
                      enqueueSnackbar("container started", {
                        variant: "success",
                        autoHideDuration: 2000,
                      });
                      getContainers();
                    })
                    .catch((err) => {
                      enqueueSnackbar("error starting container", {
                        variant: "error",
                        autoHideDuration: 2000,
                      });
                    });
                }}
              >
                start
              </Button>
            )}

            {row.state === "Running" && (
              <Button
                className="button"
                style={{
                  padding: "5px",
                  height: "30px",
                  marginBottom: "5px",
                }}
                onClick={() => {
                  setOpend(true);
                  window.open(
                    `https://13.232.217.78:${row.shellinaBoxPort}`,
                    "_blank"
                  );
                }}
              >
                connect
              </Button>
            )}
          </TableCell>
          <Dialog
            open={opend}
            TransitionComponent={Transition}
            onClose={handleClose}
          >
            <DialogTitle>Credentials</DialogTitle>
            <DialogContent>
              <DialogContentText>Username: instructor</DialogContentText>
              <DialogContentText>
                Password: {row.shellinaBoxPassword}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpend(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </TableRow>
        <Dialog open={open} disableEnforceFocus={true}>
          <form onSubmit={(e) => handleCommit(e, row)}>
            <DialogTitle>Commit</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Convert the running container into an image
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="tag"
                label="Image tag"
                type="text"
                name="tag"
                fullWidth
                variant="standard"
                defaultValue={tag}
                onChange={(e) => {
                  setTag(e.target.value);
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Commit</Button>
            </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    );
  }

  useEffect(() => {
    setLoading(true);
    getImages();
    getContainers();
  }, []);

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <TableContainer>
        <br />
        <Typography component="h2" variant="h5">
          My Imges
        </Typography>
        <Typography component="p">
          This table lists out the images either created or under creation by
          you.
        </Typography>
        <hr />
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Base Image</TableCell>
              <TableCell>Image Name</TableCell>
              <TableCell>Container Name</TableCell>
              <TableCell>Date of Creation</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myimages &&
              myimages.map((row) => (
                <Row key={row.id} row={row} type="image" />
              ))}
            {myContainers &&
              myContainers.map((row) => (
                <Row key={row.id} row={row} type="container" />
              ))}
          </TableBody>
        </Table>
        {loading && <LinearProgress />}
      </TableContainer>
    </Container>
  );
};
