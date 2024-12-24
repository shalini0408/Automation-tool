import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import logoutIcon from "../assets/images/home/logout.png";
import menuIcon from "../assets/images/home/menuicon.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: "2rem",
  },
  navlink: {
    margin: "0 1rem",
    fontSize: "18px",
    fontWeight: "400",
    textDecoration: "none",
    color: "unset",
    "&:hover": {
      textDecoration: "underline",
    },
    cursor: "pointer",
  },
}));

export default function NavBar({ user }) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={2} className="appbar">
        <div>
          <img
            className="menuicon"
            src={menuIcon}
            alt="menu"
            style={{ width: "24px", margin: ".5rem" }}
            onClick={() => setOpen(!open)}
          />
        </div>
        <Toolbar
          variant="dense"
          className="toolbar"
          className={open ? "toolbar-open" : "toolbar-close"}
        >
          {user && (
            <div style={{ display: "flex" }} className="navbox">
              <Link
                className="navlink"
                to="/imagemanager"
                variant="h6"
                color="inherit"
                className={classes.navlink}
              >
                Image
              </Link>
              {user.role === "admin" && (
                <Link
                  className="navlink"
                  to="/systems"
                  variant="h6"
                  color="inherit"
                  className={classes.navlink}
                >
                  Systems
                </Link>
              )}
              <Link
                className="navlink"
                to="/users"
                variant="h6"
                color="inherit"
                className={classes.navlink}
              >
                Users
              </Link>
              <Link
                className="navlink"
                to="/Deployments"
                variant="h6"
                color="inherit"
                className={classes.navlink}
              >
                Deploy
              </Link>
            </div>
          )}
          {user && (
            <div
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                localStorage.removeItem("user");
                window.location.reload();
              }}
            >
              <img src={logoutIcon} alt="logout" style={{ width: "24px" }} />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
