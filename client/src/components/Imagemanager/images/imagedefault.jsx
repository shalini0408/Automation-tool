import React from "react";
import { useRouteMatch } from "react-router-dom";
import DefaultCard from "../../home/DefaultCard";

export const ImageDefault = () => {
  let { path } = useRouteMatch();

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "1rem",
          marginTop: "10%",
        }}
      >
        <DefaultCard
          title="View Images"
          description="Visit the global image catalog. To filter and choose from existing images"
          link="view"
          linkText="View Images"
        />

        <DefaultCard
          title="Create Image"
          description="Create custom images from scratch or build upon existing images"
          link="view"
          type="create"
          linkText=""
        />

        <DefaultCard
          title="My Images"
          description="View all the images created or under creation by you."
          link="images_running"
          linkText="My Images"
        />
      </div>
    </div>
  );
};
