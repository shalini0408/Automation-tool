import {
	Button,
	Container,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import axios from "axios";
import React from "react";

export const useStyles = makeStyles((theme) => ({
	inputBx: {
		position: "relative",
		display: "flex",
		alignItems: "center",
	},
	labs: {
		marginTop: "20px",
		marginBottom: "20px",
		// border: "1px solid #e0e0e0",
	},

	title: {
		fontSize: "2.5rem",
		marginTop: "2rem",
	},
}));

const CreateLabAdmin = ({ removeRemote, handleChange }) => {
	const classes = useStyles();
	const [firstName, setFirstName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [email, setEmail] = React.useState("");

	const onSubmit = (e) => {
		e.preventDefault();
		const studentData = {
			firstName,
			lastName,
			email,
			role: "admin",
		};

		// axios
		// 	.post("/api/auth/user", studentData)
		// 	.then((res) => {
		// 		if (res.status === 200) {
		// 			alert("Student Added Successfully");
		// 			setFirstName("");
		// 			setLastName("");
		// 			setEmail("");
		// 		}
		// 	})
		// 	.catch((err) => console.log(err));
	};
	return (
		<Container maxWidth='md'>
			<Typography variant='h2' className={classes.title}>
				Add a new Instructor
			</Typography>
			<Typography variant='p' className={classes.description}>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis,
				recusandae voluptates!.
			</Typography>
			<div style={{ marginTop: "2rem" }}>
				<Grid container spacing={3} className={classes.labs}>
					<Grid item xs={12} sm={12} className={classes.inputBx}>
						<TextField
							variant='outlined'
							fullWidth
							id='name'
							label='Name'
							type='text'
							name='name'
							autoComplete='system'
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							color='primary'
						/>
					</Grid>
					<Grid item xs={12} sm={12} className={classes.inputBx}>
						<TextField
							variant='outlined'
							fullWidth
							id='name'
							label='Name'
							type='text'
							name='name'
							autoComplete='system'
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							color='primary'
						/>
					</Grid>
					<Grid item xs={12} sm={12} className={classes.inputBx}>
						<TextField
							variant='outlined'
							fullWidth
							id='email'
							label='Email Address'
							type='text'
							name='email'
							autoComplete='category'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							color='primary'
						/>
					</Grid>
					<Button
						variant='contained'
						style={{ margin: "10px", float: "right" }}
						className='button button-primary'
						onClick={onSubmit}
					>
						Add Admin
					</Button>
				</Grid>
			</div>
		</Container>
	);
};

export default CreateLabAdmin;
