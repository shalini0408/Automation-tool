import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { CreationInfo } from "./ImageCatalog";
import { ImageDefault } from "./imagedefault";
import { CreationForm_running } from "./UserImages";
import CreateContainer from "../ImageCreationPage";
import NavBar from "../../navbar";
export const ImageManager = () => {
	let { path } = useRouteMatch();

	return (
		<div>
			<Route component={ImageDefault} path={path} exact />
			<Route component={CreateContainer} path={`${path}/create`} />
			<Route component={CreationInfo} path={`${path}/view`} />
			<Route component={CreationForm_running} path={`${path}/images_running`} />
		</div>
	);
};
