import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useRouteMatch } from "react-router-dom";
import ContainerImage from "../Imagemanager/ContainerImage";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles({
  card: {
    minWidth: "250px",
    // height: "100%",
    display: "flex",
    width: "250px",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "4px 8px 15px 2px rgba(0, 0, 0, 0.2)",
    padding: "10px",
    borderRadius: "10px",
  },
});

export default function DefaultCard({
  description,
  title,
  link,
  linkText,
  type,
}) {
  let { path } = useRouteMatch();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card style={{ margin: "1rem" }} className={classes.card}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        {type === "create" ? (
          <ContainerImage
            open={open}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
          />
        ) : (
          <Button
            variant="contained"
            className="button button-primary"
            style={{ marginRight: "10px" }}
          >
            <Link
              to={`${path}/${link}`}
              style={{ textDecoration: "none", color: "#fff" }}
            >
              {linkText}
            </Link>
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
