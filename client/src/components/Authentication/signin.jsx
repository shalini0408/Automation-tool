import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import makeStyles from "@mui/styles/makeStyles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SignIn = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      window.location.href = "/";
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const signData = {
      email: email,
      password: password,
    };
    console.log(signData);
    axios
      .post("/api/auth/signin", signData, {
        headers: {
          "Allow-origin-access-control": "true",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(res.data.jwt));
          window.location.href = "/";
          enqueueSnackbar("Login Successful", {
            variant: "success",
            autoHideDuration: 4000,
          });
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        enqueueSnackbar("Invalid Credentials", {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="ID"
            label="ID"
            name="ID"
            autoComplete="ID"
            autoFocus
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Password"
            label="Password"
            type="Password"
            id="Password"
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit + " button button-primary"}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/signup" style={{ color: "#222" }}>
                I don't have an account. Request admin
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
