import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router";

export const useStyles = makeStyles((theme) => ({
  inputBx: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  labs: {
    marginTop: "20px",
    marginBottom: "20px",
    // border: "1px solid #e0e0e0",
  },

  title: {
    fontSize: "2.5rem",
    marginTop: "2rem",
  },
}));

const AddLabs = ({ removeRemote, handleChange }) => {
  const classes = useStyles();
  const [labName, setLabName] = React.useState("");
  const [branchName, setBranchName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    const labData = {
      labName,
      branchName,
      category,
    };
    //console.log(labData)
    axios
      .post("/api/labs", labData)
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar("Lab Added Successfully", {
            variant: "success",
            autoHideDuration: 2000,
          });
          history.push("/systems");
        }
      })
      .catch((err) =>
        enqueueSnackbar("Invalid params or server error", {
          variant: "error",
          autoHideDuration: 2000,
        })
      );
  };
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" className={classes.title}>
        Add a new Lab
      </Typography>
      <Typography variant="p" className={classes.description}>
        Create a new group resembling a physical lab in the campus, under which
        you can later add systems belonging to that lab.
      </Typography>
      <div style={{ marginTop: "2rem" }}>
        <Grid container spacing={3} className={classes.labs}>
          <Grid item xs={12} sm={12} className={classes.inputBx}>
            <TextField
              variant="outlined"
              fullWidth
              id="labname"
              label="Lab Name"
              type="text"
              name="labname"
              autoComplete="system"
              value={labName}
              onChange={(e) => setLabName(e.target.value)}
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
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={12} className={classes.inputBx}>
            <TextField
              variant="outlined"
              fullWidth
              id="Category"
              label="Category"
              type="text"
              name="Category"
              autoComplete="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              color="primary"
            />
          </Grid>
          <Button
            style={{ margin: "10px 24px" }}
            className="button button-primary"
            onClick={onSubmit}
          >
            Add Lab
          </Button>
        </Grid>
      </div>
    </Container>
  );
};

export default AddLabs;
