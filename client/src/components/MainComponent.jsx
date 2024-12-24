import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./navbar";
import { ImageManager } from "./Imagemanager/images";
import { SystemManager } from "./systemsManager";
// import { View } from "./View";
import { ViewRemotes } from "./systemsManager";
import { SignUp } from "./Authentication";
import { SignIn } from "./Authentication";
import { DeploymentManager } from "./DeploymentManager";
import { Home } from "./home";
import { UserManager } from "./UserManager/userManager";
import jwt from "jsonwebtoken";

const MainComponent = () => {
	const [user, setUser] = React.useState(null);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			const decoded = jwt.verify(user, "SECRET");
			setUser(decoded);
		}
	}, []);

	return (
		<BrowserRouter>
			<NavBar user={user} />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route component={SystemManager} path='/systems' />
				<Route component={ImageManager} path='/imagemanager' />
				<Route component={UserManager} path='/users' />
				<Route component={DeploymentManager} path='/Deployments' />
				<Route component={ViewRemotes} path={`/view`} />
				<Route component={SignIn} path={`/signin`} />
				<Route component={SignUp} path={`/signup`} />
			</Switch>
		</BrowserRouter>
	);
};

export default MainComponent;
