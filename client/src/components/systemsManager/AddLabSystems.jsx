import {
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  LinearProgress,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import LabSystem, { useStyles } from "./LabSystem";
import { Autocomplete } from "@mui/material";
import { parse } from "papaparse";
import { CsvToHtmlTable } from "react-csv-to-table";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router";

function validateAndExtract(data) {
  if (data.length <= 1) return false;

  const columnIdxs = {};

  const systemNameIdx = data[0].indexOf("system name");
  if (systemNameIdx === -1) return false;
  columnIdxs["systemNameIdx"] = systemNameIdx;

  const userNameIdx = data[0].indexOf("user name");
  if (userNameIdx === -1) return false;
  columnIdxs["userNameIdx"] = userNameIdx;

  const passwordIdx = data[0].indexOf("password");
  if (passwordIdx === -1) return false;
  columnIdxs["passwordIdx"] = passwordIdx;

  const ipAddressIdx = data[0].indexOf("ip address");
  if (ipAddressIdx === -1) return false;
  columnIdxs["ipAddressIdx"] = ipAddressIdx;

  const ramIdx = data[0].indexOf("ram");
  if (ramIdx === -1) return false;
  columnIdxs["ramIdx"] = ramIdx;

  const romIdx = data[0].indexOf("rom");
  if (romIdx === -1) return false;
  columnIdxs["romIdx"] = romIdx;

  let systems = {
    columnIdxs: {
      systemNameIdx,
      userNameIdx,
      passwordIdx,
      ipAddressIdx,
      ramIdx,
      romIdx,
    },
    data: [],
  };

  for (let i = 1; i < data.length - 1; i++) {
    systems.data.push({
      userName: data[i][userNameIdx],
      password: data[i][passwordIdx],
      ipAddress: data[i][ipAddressIdx],
      systemName: data[i][systemNameIdx],
      ram: data[i][ramIdx],
      rom: data[i][romIdx],
      modelName: "",
      OS: "",
    });
  }

  return systems;
}

function csvToString(csvData) {
  let res = "\nSystem name,User name,Ip Address,RAM,ROM\n";

  csvData.data.forEach((elem) => {
    res += `${elem.systemName},${elem.userName},${elem.password},${elem.ipAddress},${elem.ram},${elem.rom}\n`;
  });

  return res;
}

export const AddRemotes = () => {
  const classes = useStyles();
  const [file, setFile] = React.useState();
  const [csvData, setCSVData] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const history = useHistory();

  const [remotes, setRemotes] = React.useState([
    {
      userName: "",
      password: "",
      ipAddress: "",
      systemName: "",
      ram: "",
      rom: "",
      modelName: "",
      OS: "",
    },
  ]);

  React.useEffect(() => {
    if (file) {
      parse(file, {
        complete: function onComplete(results) {
          const parsedData = validateAndExtract(results.data);
          if (parsedData) {
            setCSVData(parsedData);
          } else {
            enqueueSnackbar("file is not in a corret format", {
              variant: "error",
              autoHideDuration: 2000,
            });
          }
        },
      });
    }
  }, [file]);

  const [labId, setLabId] = React.useState("");
  const [labs, setLabs] = React.useState([]);

  const handleChange = (event, i) => {
    const newRemotes = [...remotes];
    newRemotes[i][event.target.name] = event.target.value;
    setRemotes(newRemotes);
  };

  // function to add a new remote
  const addRemote = () => {
    const newRemotes = [...remotes];
    newRemotes.push({
      userName: "",
      password: "",
      ipAddress: "",
      systemName: "",
      ram: "",
      rom: "",
      modelName: "",
      OS: "",
    });
    setRemotes(newRemotes);
    console.log(remotes);
  };

  const removeRemote = (i) => {
    const newRemotes = [...remotes];
    newRemotes.splice(i, 1);
    setRemotes(newRemotes);
    console.log(remotes);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/labs")
      .then((res) => {
        const names = res.data.map((lab) => {
          return {
            label: lab.name,
            id: lab._id,
          };
        });
        setLabs(names);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // send to server
    axios
      .post("/api/systems/save", {
        systems: remotes,
        labId: labId,
      })
      .then((res) => {
        if (res.data.status === 200) {
          enqueueSnackbar("Systems Added Successfully", {
            variant: "success",
            autoHideDuration: 2000,
          });
        }
        if (res.data.status === 400) {
          enqueueSnackbar(res.data.message, {
            variant: "error",
            autoHideDuration: 2000,
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar("Error Adding systems", {
          variant: "error",
          autoHideDuration: 2000,
        });
      });
  };

  if (loading) {
    return (
      <div className={classes.root}>
        <LinearProgress />
      </div>
    );
  }
  return (
    <Container maxWidth="lg">
      <div style={{ margin: "0 auto" }}>
        <Typography
          variant="h2"
          style={{
            marginTop: "2rem",
            marginBottom: "2rem",
            fontSize: "2.5rem",
          }}
        >
          Add Lab Systems
        </Typography>

        <form>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} className={classes.inputBx}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {labs.length != 0 && (
                  <Autocomplete
                    fullWidth
                    id="lab"
                    options={labs}
                    getOptionLabel={(option) => option.label}
                    style={{
                      marginBottom: "1rem",
                    }}
                    onChange={(event, value) => {
                      setLabId(value.id);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        required
                        fullWidth
                        id="LabName"
                        type="text"
                        color="primary"
                        label="label"
                      />
                    )}
                  />
                )}
                {csvData && (
                  <CsvToHtmlTable
                    data={csvToString(csvData)}
                    csvDelimiter=","
                    tableClassName="table table-striped table-hover"
                  />
                )}
                <div style={{ display: "flex" }}>
                  <div>
                    <label htmlFor="csv" className="button button-primary">
                      Upload CSV
                    </label>
                    <input
                      id="csv"
                      type="file"
                      className="button button-primary"
                      style={{ display: "none" }}
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    className="button"
                    onClick={addRemote}
                    style={{ marginLeft: "20px", backgroundColor: "#242830" }}
                  >
                    Add Systems
                  </Button>
                  <Button
                    variant="outlined"
                    className="button"
                    onClick={handleSubmit}
                    style={{
                      marginLeft: "20px",
                      backgroundColor: "#4cbb17",
                      color: "black",
                    }}
                  >
                    save changes
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={12}>
              {remotes.map((remote, i) => (
                <LabSystem
                  key={i}
                  index={i}
                  remote={remote}
                  handleChange={handleChange}
                  removeRemote={removeRemote}
                />
              ))}
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
