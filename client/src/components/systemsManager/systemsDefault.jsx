import React from "react";
import { useRouteMatch } from "react-router-dom";
import DefaultCard from "../home/DefaultCard";

export const SystemsDefault = () => {
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
        title="Add Lab"
        description="Create a new group of systems, to identify it as lab."
        link="addLab"
        linkText="Add Lab"
      />
      <DefaultCard
        title="View Labs"
        description="View and manage systems under a lab."
        link="view"
        linkText="view labs"
      />
      <DefaultCard
        title="Add Systems"
        description="Add new systema to an existing lab"
        link="add"
        linkText="add systems"
      />
    </div>
  );
};
