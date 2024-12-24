import axios from "axios";
import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import jwt from "jsonwebtoken";

const ViewDeployments = (props) => {
  const [deployments, setDeployments] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const type = props.type;

  React.useEffect(() => {
    const user = jwt.verify(JSON.parse(localStorage.getItem("user")), "SECRET");
    console.log(user);
    setUser(user);
    axios
      .get(
        `/api/deployment/schedule/${type}?scheduledBy=${user.id}&role=${user.role}`
      )
      .then((res) => {
        console.log(res.data);
        setDeployments(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/deployment/schedule/${id}`).then((res) => {
      window.location.reload();
    });
  };

  return (
    <Container component="main" style={{ marginTop: "2rem" }}>
      <Typography component="h2" variant="h5">
        Scheduled deployments
      </Typography>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        deployments &&
        deployments.map((deployment) => (
          <div key={deployment.id}>
            <Card style={{ margin: "1rem", maxWidth: "600px" }}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                  {deployment.topic}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Scheduled From : {new Date(deployment.from).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Scheduled Till : {new Date(deployment.to).toLocaleString()}
                </Typography>
              </CardContent>

              <CardActions>
                <Button style={{ color: "#097dea" }}>update</Button>
                <Button
                  style={{ color: "red" }}
                  onClick={() => handleDelete(deployment._id)}
                >
                  delete
                </Button>
              </CardActions>
            </Card>
          </div>
        ))
      )}
    </Container>
  );
};

export default ViewDeployments;
