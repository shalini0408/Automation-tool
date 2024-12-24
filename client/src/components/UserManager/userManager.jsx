import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import NavBar from "./../navbar";
import CreateInstructor from "./CreateInstructor";
import CreateLabAdmin from "./CreateLabAdmin";
import CreateStudentUser from "./CreateStudentUser";
import { UserDefault } from "./UserDefault";
import { ViewInstructor } from "./ViewInstructor";
import { ViewLabAdmin } from "./ViewLabAdmin";
import { ViewStudents } from "./ViewStudents";
export const UserManager = () => {
	let { path } = useRouteMatch();

	return (
		<div>
			<Route component={UserDefault} path={path} exact />
			<Route component={CreateStudentUser} path={`${path}/create/student`} />
			<Route component={CreateLabAdmin} path={`${path}/create/admin`} />
			<Route component={CreateInstructor} path={`${path}/create/instructor`} />
			<Route component={ViewStudents} path={`${path}/view/students`} />
			<Route component={ViewInstructor} path={`${path}/view/instructors`} />
			<Route component={ViewLabAdmin} path={`${path}/view/admins`} />
		</div>
	);
};
