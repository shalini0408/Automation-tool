import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { DeployDefault } from "./deployDefault";
import { ScheduleDeployments } from "./ScheduleDeployments";
import View from "./deployments/View";

//import NavBar from "../../navbar";
export const DeploymentManager = () => {
  let { path } = useRouteMatch();

  return (
    <div>
      <Route component={DeployDefault} path={path} exact />
      <Route component={ScheduleDeployments} path={`${path}/schedule`} />
      <Route component={View} path={`${path}/view`} />
    </div>
  );
};
