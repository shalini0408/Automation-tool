import React from "react";
import { Button } from "@mui/material";
import { Link, useRouteMatch } from "react-router-dom";
import DefaultCard from "../home/DefaultCard";

export const DeployDefault = () => {
  let { path } = useRouteMatch();

  return (
    <div
      style={{
        margin: "1rem 1rem",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: "10%",
      }}
    >
      <DefaultCard
        title="Schedule Deployments"
        description="Scheduling the labs."
        link="schedule"
        linkText="Schedule Lab"
      />

      <DefaultCard
        title="Deployments"
        description="Deployment of the labs."
        link="view"
        linkText="View Deployments"
      />
    </div>
  );
};
