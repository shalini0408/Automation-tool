import React from "react";
import images from "../../assets/images/home/pictures.png";
import labs from "../../assets/images/home/meeting-room.png";
import deployments from "../../assets/images/home/deployment.png";
import users from "../../assets/images/home/people.png";
import systems from "../../assets/images/home/content-management-system.png";

export const Comp = (props) => {
	const icons = {
		"Image Management": images,
		"Lab Management": labs,
		"Deployment Management": deployments,
		"User Management": users,
		"System Management": systems,
	}
	return (
		<div>
			<div class='feature-icon'>
				<img src={icons[props.title]} alt='Feature 01' style={{ width: "100px" }}/>
			</div>
			<h4 class='feature-title mt-24'>{props.title}</h4>
			<p
				class='text-sm mb-0'
				style={{ fontWeight: "400", marginBottom: "20px" }}
			>
				{props.cont}
			</p>
		</div>
	);
};

// export default Comp1;
