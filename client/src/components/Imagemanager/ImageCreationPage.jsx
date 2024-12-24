import React from "react";
import { Container, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import Images from "./ImageCreationForm";

const useStyles = makeStyles((theme) => ({
	title: {
		fontSize: "2.5rem",
		fontWeight: "300",
		// marginBottom: "1rem",
		marginTop: "2rem",
	},
	description: {
		marginBottom: "2rem",
	},
}));

const CreateContainer = (props) => {
	const classes = useStyles();

	const customImage = props.location.state
		? props.location.state.customBaseImage
		: "";
	return (
		<Container maxWidth='lg'>
			<Typography variant='h2' className={classes.title}>
				Create Container
			</Typography>
			<Typography variant='p' className={classes.description}>
				Create your own container by selecting the required base Image to modify
				it further.
			</Typography>
			<div style={{ marginTop: "2rem" }}>
				<Images customBaseImage={customImage} />
			</div>
		</Container>
	);
};

export default CreateContainer;
