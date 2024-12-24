import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { ViewRemotes } from "./ViewLabs";
import { AddRemotes } from "./AddLabSystems";
import { SystemsDefault } from "./systemsDefault";
import AddLabs from "./AddLabs";
import ViewLab from "./ViewLab";
export const SystemManager = () => {
  let { path } = useRouteMatch();
  console.log(path);

  return (
    <div>
      <Route component={SystemsDefault} path={path} exact />
      <Route component={ViewRemotes} path={`${path}/view`} />
      <Route component={AddRemotes} path={`${path}/add`} />
      <Route component={AddLabs} path={`${path}/addLab`} />
      <Route component={ViewLab} path={`${path}/viewlab`} />
    </div>
  );
};
