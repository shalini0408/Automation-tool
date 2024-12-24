import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useHistory } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ContainerImage({ open, handleClose, handleClickOpen }) {
  const history = useHistory();
  return (
    <div>
      <Button
        variant="contained"
        className="button button-primary"
        onClick={handleClickOpen}
      >
        Create Image
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Start from an existing image?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Click on Yes if you want to select an image from the catalog, to
            create a new one. And No if you want to start from scratch.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              history.push("/imagemanager/view");
            }}
            color="primary"
          >
            YES
          </Button>
          <Button
            onClick={() => {
              history.push("/imagemanager/create");
            }}
            color="primary"
          >
            NO
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
