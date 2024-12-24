import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  Container,
  LinearProgress,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import withStyles from "@mui/styles/withStyles";
import Grid from "@mui/material/Grid";
import { Autocomplete } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import axios from "axios";
import "date-fns";
import jwt from "jsonwebtoken";
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: "2rem",
    marginBottom: "2rem",
  },
  inputBx: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  subtitle: {
    fontSize: "1.2rem",
    fontWeight: "400",
    color: "#333",
    margin: "1rem 0",
    width: "100%",
  },
  p: {
    color: "#333",
    opacity: "0.7",
  },
  innerSubtitle: {
    margin: "1rem 0 0.5rem 0.2rem",
    fontWeight: "400",
    color: "#333",
  },
}));

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#fff",
    color: "rgba(0, 0, 0, 0.87)",
    // boxShadow: theme.shadows[1],
    fontSize: 13,
    fontWeight: "400",
  },
}))(Tooltip);

export const ScheduleDeployments = () => {
  const [checkColor, setCheckColor] = useState("orange");
  const [checkText, setCheckText] = useState("CHECK SLOT");
  const [loading, setLoading] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const history = useHistory();

  const [schedule, setSchedule] = useState({
    topic: "",
    labName: "",
    labId: "",
    imageName: "",
    imageId: "",
    from: new Date(),
    to: new Date(),
    scheduledBy: "",
  });

  useEffect(() => {
    const user = jwt.verify(JSON.parse(localStorage.getItem("user")), "SECRET");
    console.log(user);
    setSchedule({
      ...schedule,
      scheduledBy: user.id,
    });
  }, []);

  const [labs, setLabs] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get("/api/labs").then((res) => {
      const names = res.data.map((lab) => {
        return {
          label: lab.name,
          id: lab._id,
        };
      });
      setLabs(names);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get("/api/image/images/all").then((res) => {
      const names = res.data.map((image) => {
        return {
          label: image.repo,
          id: image._id,
        };
      });
      setImages(names);
      setLoading(false);
    });
  }, []);

  const handleCheckSlot = (e) => {
    if (schedule.labId === "") {
      enqueueSnackbar("please select a lab", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return;
    }
    setCheckLoading(true);
    axios
      .post("/api/deployment/schedule/check", {
        from: schedule.from,
        to: schedule.to,
        labId: schedule.labId,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.available === true) {
          setCheckColor("green");
          setCheckText("AVAILABLE");
        } else {
          setCheckColor("red");
          setCheckText("UNAVAILABLE");
        }
        setCheckLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      schedule.labName === "" ||
      schedule.imageName === "" ||
      schedule.topic === ""
    ) {
      enqueueSnackbar("please fill all the fields", {
        variant: "error",
        autoHideDuration: 2000,
      });

      return;
    }

    const data = {
      topic: schedule.topic,
      labName: schedule.labName,
      labId: schedule.labId,
      imageName: schedule.imageName,
      imageId: schedule.imageId,
      from: schedule.from.toISOString(),
      to: schedule.to.toISOString(),
      scheduledBy: schedule.scheduledBy,
    };

    axios.post("/api/deployment/schedule", data).then((res) => {
      console.log(res.data);
      enqueueSnackbar("deployment scheduled", {
        variant: "success",
        autoHideDuration: 2000,
      });
      history.push("/deployments");
    });
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <div>
      <Container component="main" style={{ marginTop: "2rem" }}>
        <Typography component="h2" variant="h5">
          Schedule deployments
        </Typography>
        <hr />

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} className={classes.inputBx}>
              {labs.length != 0 && (
                <Autocomplete
                  fullWidth
                  id="lab"
                  options={labs}
                  required
                  placeholder="Select Lab"
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      fullWidth
                      id="LabName"
                      type="text"
                      color="primary"
                      label="Lab Name"
                      placeholder="Lab Name"
                    />
                  )}
                  onChange={(event, value) => {
                    console.log(value);
                    setSchedule({
                      ...schedule,
                      labName: value.label,
                      labId: value.id,
                    });
                  }}
                />
              )}
              <LightTooltip
                title="Name for these group of remote machines"
                placement="right"
                arrow
              >
                <div>
                  <i className="uil uil-info-circle info__icon"></i>
                </div>
              </LightTooltip>
            </Grid>
            <Grid item xs={12} sm={12} className={classes.inputBx}>
              {images.length != 0 && (
                <Autocomplete
                  fullWidth
                  id="lab"
                  options={images}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      fullWidth
                      id="image"
                      type="text"
                      color="primary"
                      label="Image Name"
                    />
                  )}
                  onChange={(event, value) => {
                    setSchedule({
                      ...schedule,
                      imageName: value.label,
                      imageId: value.id,
                    });
                  }}
                />
              )}
              <LightTooltip
                title="primary key is used to ssh into the machines"
                placement="right"
                arrow
              >
                <div>
                  <i className="uil uil-info-circle info__icon"></i>
                </div>
              </LightTooltip>
            </Grid>
            <Grid item xs={12} sm={12} className={classes.inputBx}>
              <TextField
                variant="outlined"
                fullWidth
                id="TopicName"
                label="Topic Name"
                type="textarea"
                name="TopicName"
                autoComplete="TopicName"
                color="primary"
                onChange={(e) =>
                  setSchedule({ ...schedule, topic: e.target.value })
                }
              />
              <LightTooltip
                title="primary key is used to ssh into the machines"
                placement="right"
                arrow
              >
                <div>
                  <i className="uil uil-info-circle info__icon"></i>
                </div>
              </LightTooltip>
            </Grid>
            <Grid item xs={12} sm={12} className={classes.inputBx}>
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Upload Execl File
                </Button>
              </label>
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid
                container
                spacing={2}
                justifyContent="space-around"
                style={{ marginTop: "2rem" }}
              >
                <DateTimePicker
                  label="Pick from time"
                  value={schedule.from}
                  onChange={(date) => {
                    setSchedule({ ...schedule, from: date });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />

                <DateTimePicker
                  label="Pick to time"
                  value={schedule.to}
                  onChange={(date) => {
                    setSchedule({ ...schedule, to: date });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </LocalizationProvider>
          </Grid>

          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="contained-button-file"
          />

          <Button
            variant="contained"
            className="button"
            style={{
              marginTop: "1rem",
              marginRight: "1rem",
              backgroundColor: checkColor,
              width: "140px",
            }}
            onClick={handleCheckSlot}
          >
            {checkLoading ? (
              <CircularProgress size={24} />
            ) : (
              <span>{checkText}</span>
            )}
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="button button-primary"
            style={{ maxWidth: "200px", marginTop: "1rem" }}
          >
            Schedule
          </Button>
        </form>
      </Container>
    </div>
  );
};
