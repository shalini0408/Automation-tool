import React, { useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import "../../styles/images.css";
// import ubuntuIcon from '../../assets/images/ubuntu.svg';
import { LightTooltip } from "./images";
import ImageList from "./imageList";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: "1.2rem",
    fontWeight: "300",
    marginBottom: "0px",
    marginTop: "1rem",
  },
  inputBx: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
}));

const Images = ({ customBaseImage }) => {
  const classes = useStyles();

  const [baseImage, setBaseImage] = useState("");
  const [customImage, setCustomImage] = useState(customBaseImage);
  const [containeName, setContaineName] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    var randomId = Math.floor(1000 + Math.random() * 90000);

    const userData = jwt.verify(
      JSON.parse(localStorage.getItem("user")),
      "SECRET"
    );

    const containerValues = {
      baseImage,
      containerName: `ubuntu-${randomId}`,
      password,
      userId: userData.id,
    };
    setIsLoading(true);
    axios
      .post("/api/image/containers/allocate", containerValues)
      .then((res) => {
        enqueueSnackbar("container created successfully", {
          variant: "success",
          autoHideDuration: 2000,
        });
        setIsLoading(false);
        window.open(`https://${res.data.ip}:${res.data.port}`, "_blank");
      })
      .then(() => {
        history.push("/imagemanager/images_running");
      })
      .catch((err) => {
        enqueueSnackbar("server error", {
          variant: "error",
          autoHideDuration: 2000,
        });
      });
  };

  return (
    <div style={{ margin: "0 auto" }}>
      <Typography variant="p" className={classes.label}>
        Choose an image
      </Typography>
      <form onSubmit={onSubmit}>
        <ImageList
          setBaseImage={setBaseImage}
          baseImage={baseImage}
          customBaseImage={customImage}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} className={classes.inputBx}>
            <TextField
              variant="outlined"
              fullWidth
              required
              id="description"
              label="Container Name"
              type="text"
              name="contianerName"
              autoComplete="contianerName"
              color="primary"
              value={containeName}
              onChange={(e) => setContaineName(e.target.value)}
            />
            <LightTooltip title="Add" placement="right" arrow>
              <div>
                <i className="uil uil-info-circle info__icon"></i>
              </div>
            </LightTooltip>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.inputBx}>
            <TextField
              variant="outlined"
              fullWidth
              disabled
              color="primary"
              label="username:instructor"
              placeholder="instructor"
            />
            <LightTooltip title="Add" placement="right" arrow>
              <div>
                <i className="uil uil-info-circle info__icon"></i>
              </div>
            </LightTooltip>
          </Grid>
          <Grid item xs={12} sm={12} md={6} className={classes.inputBx}>
            <TextField
              required
              variant="outlined"
              fullWidth
              id="password"
              label="password"
              type="text"
              name="password"
              autoComplete="password"
              color="primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <LightTooltip title="Add" placement="right" arrow>
              <div>
                <i className="uil uil-info-circle info__icon"></i>
              </div>
            </LightTooltip>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="button button-primary"
            style={{
              marginTop: "2rem",
              marginLeft: "1rem",
              marginBottom: "2rem",
              width: "150px",
            }}
          >
            create
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default Images;
