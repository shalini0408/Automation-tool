import React, { useEffect } from "react";
import DefaultCard from "../home/DefaultCard";
import jwt from "jsonwebtoken";

export const UserDefault = () => {
	const [user, setUser] = React.useState(null);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			const decoded = jwt.verify(user, "SECRET");
			setUser(decoded);
		}
	}, []);

	return (
		<div
			style={{
				margin: "1rem 1rem",
				display: "flex",
				justifyContent: "center",
				flexWrap: "wrap",
				marginTop: "8%",
			}}
		>
			<DefaultCard
				description=''
				link='create/student'
				linkText='create student'
				title='Add New Student'
			/>
			{user && user.role === "admin" && (
				<>
					<DefaultCard
						description=''
						link='create/instructor'
						linkText='create instructor'
						title='add new instructor'
					/>
					<DefaultCard
						description=''
						link='create/admin'
						linkText='create admin'
						title='add new admin'
					/>
					<DefaultCard
						description=''
						link='view/instructors'
						linkText='view instructors'
						title='view all instructors'
					/>
					<DefaultCard
						description=''
						link='view/admins'
						linkText='view admin'
						title='view all admin'
					/>
				</>
			)}
			<DefaultCard
				description=''
				link='view/students'
				linkText='view students'
				title='view all students'
			/>
		</div>
	);
};
