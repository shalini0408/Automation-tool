import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles((theme) => ({
  inputBx: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  labs: {
    marginTop: "20px",
    marginBottom: "20px",
    borderRadius: "6px",
    padding: "20px",
    boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.2)",
  },
}));

const LabSystem = ({ removeRemote, handleChange, index, remote }) => {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={3} className={classes.labs}>
        <Grid item xs={12} sm={12} className={classes.inputBx}>
          <TextField
            variant="outlined"
            fullWidth
            id="systemName"
            label="System Name"
            type="text"
            name="systemName"
            autoComplete="system"
            value={remote.systemName}
            onChange={(e) => handleChange(e, index)}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={12} className={classes.inputBx}>
          <TextField
            variant="outlined"
            fullWidth
            id="userName"
            label="User Name"
            type="text"
            name="userName"
            autoComplete="image"
            value={remote.userName}
            onChange={(e) => handleChange(e, index)}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={12} className={classes.inputBx}>
          <TextField
            variant="outlined"
            fullWidth
            id="password"
            label="Password"
            type="text"
            name="password"
            autoComplete="password"
            value={remote.password}
            onChange={(e) => handleChange(e, index)}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={12} className={classes.inputBx}>
          <TextField
            variant="outlined"
            fullWidth
            id="ipAddress"
            label="IP Address"
            type="text"
            name="ipAddress"
            autoComplete="image"
            value={remote.ipAddress}
            onChange={(e) => handleChange(e, index)}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={12} className={classes.inputBx}>
          <TextField
            variant="outlined"
            fullWidth
            id="ram"
            label="RAM"
            type="text"
            name="ram"
            autoComplete="image"
            value={remote.ram}
            onChange={(e) => handleChange(e, index)}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={12} className={classes.inputBx}>
          <TextField
            variant="outlined"
            fullWidth
            id="rom"
            label="ROM"
            type="text"
            name="rom"
            autoComplete="image"
            value={remote.rom}
            onChange={(e) => handleChange(e, index)}
            color="primary"
          />
        </Grid>

        <Button
          variant="contained"
          // color='primary'
          style={{
            backgroundColor: "red",
            color: "#fff",
            marginLeft: "24px",
            marginTop: "10px",
          }}
          onClick={() => removeRemote(index)}
        >
          remove system
        </Button>
      </Grid>
    </div>
  );
};

export default LabSystem;
