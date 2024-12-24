import React, { useReducer } from "react";
import { Container, TextField, Grid, Typography, InputAdornment, Button, Tooltip } from "@mui/material";

import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';

const useStyles = makeStyles((theme) => ({
	form: {
		width: "100%",
		marginTop: "2rem",
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		maxWidth: "200px",
	},
	inputBx: {
		position: "relative",
		display: "flex",
		alignItems: "center",
	},
	subtitle: {
		fontSize: "1.2rem",
		fontWeight: "400",
		color: "#333",
		margin: "1rem 0",
		width: "100%",
	},
	p: {
		color: "#333",
		opacity: "0.7",
	},
	innerSubtitle: {
		margin: "1rem 0 0.5rem 0.2rem",
		fontWeight: "400",
		color: "#333",
	},
}));

export const LightTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: theme.palette.common.white,
		color: "rgba(0, 0, 0, 0.87)",
		boxShadow: theme.shadows[1],
		fontSize: 13,
		fontWeight: "400",
		maxWidth: "200px",
	},
}))(Tooltip);

const reducer = (state, action) => {
	const { type, payload } = action;
	if (type === "COPY") {
		state.copyList[payload.i].COPY = payload.value;
		return state;
	} else if (type === "RUN") {
		state.runList[payload.i].RUN = payload.value;
		return state;
	} else {
		return { ...state, [type]: payload };
	}
};

export const CreationForm = () => {
	const initialState = {
		FROM: "",
		WORKDIR: "",
		copyList: [
			{
				COPY: "",
			},
		],
		runList: [
			{
				RUN: "",
			},
		],
		envList: [],
		CMD: [],
		otherList: [],
	};
	const classes = useStyles();
	const [imageState, dispatch] = useReducer(reducer, initialState);

	const { FROM, WORKDIR, copyList, runList, CMD } =
		imageState;

	const addField = (type) => {
		if (type === "copy") {
			const newList = [...copyList];
			newList.push({
				COPY: "",
			});
			dispatch({ type: "copyList", payload: newList });
		} else if (type === "run") {
			const newList = [...runList];
			newList.push({
				RUN: "",
			});
			dispatch({ type: "runList", payload: newList });
		}
	};

	const removeField = (type, index) => {
		if (type === "copy") {
			if (copyList.length === 1) {
				return;
			}
			const newList = [...copyList];
			newList.splice(index, 1);
			dispatch({ type: "copyList", payload: newList });
		} else if (type === "run") {
			if (runList.length === 1) {
				return;
			}
			const newList = [...runList];
			newList.splice(index, 1);
			dispatch({ type: "runList", payload: newList });
		}
	};

	return (
		<div>
			<Container component='main' style={{ marginTop: "2rem" }}>
				<Typography component='h2' variant='h5'>
					Image Creation
				</Typography>
				<hr />
				<Typography component='p' className={classes.p}>
					A Docker image is a file used to execute code in a Docker container.
					Docker images act as a set of instructions to build a Docker
					container, like a template. Docker images also act as the starting
					point when using Docker. An image is comparable to a snapshot in
					virtual machine (VM) environments.
				</Typography>
				<form className={classes.form}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={12} className={classes.inputBx}>
							<TextField
								variant='outlined'
								fullWidth
								id='imageName'
								label='Image Name'
								type='text'
								name='imageName'
								autoComplete='image'
								color='primary'
							/>
							<LightTooltip title='Add' placement='right' arrow>
								<div>
									<i className='uil uil-info-circle info__icon'></i>
								</div>
							</LightTooltip>
						</Grid>
						<Grid item xs={12} sm={12} className={classes.inputBx}>
							<TextField
								variant='outlined'
								fullWidth
								id='description'
								label='Description (optoinal)'
								type='textarea'
								name='description'
								autoComplete='description'
								color='primary'
							/>
							<LightTooltip title='Add' placement='right' arrow>
								<div>
									<i className='uil uil-info-circle info__icon'></i>
								</div>
							</LightTooltip>
						</Grid>
						<Typography component='p' variant='p' className={classes.subtitle}>
							Dockerfile Arguments
							<hr />
							<Typography className={classes.p}>
								A Dockerfile is a text document that contains all the commands a
								user could call on the command line to assemble an image. Using
								docker build users can create an automated build that executes
								several command-line instructions in succession.
							</Typography>
						</Typography>
						<Grid item xs={12} sm={12} className={classes.inputBx}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='baseImageName'
								label='Enter the base image'
								type='text'
								name='baseImageName'
								autoComplete='image'
								color='primary'
								value={FROM}
								onChange={(e) =>
									dispatch({ type: "FROM", payload: e.target.value })
								}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>FROM</InputAdornment>
									),
								}}
							/>
							<LightTooltip
								placement='right'
								title='The FROM instruction initializes a new build
                 stage and sets the Base Image for subsequent instructions.
                 As such, a valid Dockerfile must start with a FROM instruction.
                 The image can be any valid image – it is especially easy to start by pulling an image from the Public Repositories.'
								arrow
							>
								<div>
									<i className='uil uil-info-circle info__icon'></i>
								</div>
							</LightTooltip>
						</Grid>
						<Grid item xs={12} sm={12} className={classes.inputBx}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='workdir'
								label='Enter the working directory'
								type='text'
								name='workdir'
								autoComplete='workdir'
								color='primary'
								value={WORKDIR}
								onChange={(e) => {
									dispatch({ type: "WORKDIR", payload: e.target.value });
								}}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>WORKDIR</InputAdornment>
									),
								}}
							/>
							<LightTooltip
								placement='right'
								title='The WORKDIR instruction sets the working directory for any RUN, CMD, ENTRYPOINT, COPY 
					and ADD instructions that follow it in the Dockerfile. If the WORKDIR doesn’t exist, it will be 
					created even if it’s not used in any subsequent Dockerfile instruction.The WORKDIR instruction can be used multiple times in a Dockerfile.'
								arrow
							>
								<div>
									<i className='uil uil-info-circle info__icon'></i>
								</div>
							</LightTooltip>
						</Grid>
						<Typography className={classes.innerSubtitle}>
							COPY Commands
						</Typography>
						{copyList.map((item, i) => {
							return (
								<Grid item xs={12} sm={12} className={classes.inputBx}>
									<TextField
										variant='outlined'
										required
										fullWidth
										id='imageName'
										label='Copy files from - to'
										type='text'
										name='imageName'
										autoComplete='image'
										color='primary'
										onChange={(e) => {
											const data = { i, value: e.target.value };
											dispatch({ type: "COPY", payload: data });
										}}
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>COPY</InputAdornment>
											),
										}}
									/>
									<div className='add_remove'>
										{copyList.length === i + 1 && (
											<i
												className='uil uil-plus-circle add__icon'
												onClick={() => addField("copy")}
											></i>
										)}
										<i
											className='uil uil-minus-circle remove__icon'
											onClick={() => removeField("copy", i)}
										></i>
									</div>
									<LightTooltip
										title='The COPY instruction copies new files or directories from <src> and adds them to 
									the filesystem of the container at the path <dest>.Multiple <src> resources may be 
									specified but the paths of files and directories will be interpreted as relative to 
									the source of the context of the build.'
										placement='right'
										arrow
									>
										<div>
											<i className='uil uil-info-circle info__icon'></i>
										</div>
									</LightTooltip>
								</Grid>
							);
						})}
						<Typography className={classes.innerSubtitle}>
							RUN Commands
						</Typography>
						{runList.map((item, i) => {
							return (
								<Grid item xs={12} sm={12} className={classes.inputBx}>
									<TextField
										variant='outlined'
										required
										fullWidth
										id='imageName'
										label='Enter the shell command'
										type='text'
										name='imageName'
										autoComplete='image'
										color='primary'
										onChange={(e) => {
											const data = { i, value: e.target.value };
											dispatch({ type: "RUN", payload: data });
										}}
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>RUN</InputAdornment>
											),
										}}
									/>
									<div className='add_remove'>
										{runList.length === i + 1 && (
											<i
												className='uil uil-plus-circle add__icon'
												onClick={() => addField("run")}
											></i>
										)}
										<i
											className='uil uil-minus-circle remove__icon'
											onClick={() => removeField("run", i)}
										></i>
									</div>
									<LightTooltip
										title='The RUN instruction will execute any commands in a new layer on top of the current image 
									and commit the results. The resulting committed image will be used for the next step in the Dockerfile.'
										placement='right'
										arrow
									>
										<div>
											<i className='uil uil-info-circle info__icon'></i>
										</div>
									</LightTooltip>
								</Grid>
							);
						})}
						<Grid item xs={12} sm={12} className={classes.inputBx}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='imageName'
								label='Enter the primary command/entrypoint'
								type='text'
								name='imageName'
								autoComplete='image'
								color='primary'
								value={CMD}
								onChange={(e) => {
									dispatch({ type: "CMD", payload: e.target.value });
								}}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>CMD</InputAdornment>
									),
								}}
							/>
							<LightTooltip
								title='The CMD instruction has three forms:
					CMD ["executable","param1","param2"] (exec form, this is the preferred form)
					CMD ["param1","param2"] (as default parameters to ENTRYPOINT)
					CMD command param1 param2 (shell form)
					There can only be one CMD instruction in a Dockerfile. If you list more than one CMD 
					then only the last CMD will take effect.The main purpose of a CMD is to provide defaults
					for an executing container. These defaults can include an executable, or they can omit the 
					executable, in which case you must specify an ENTRYPOINT instruction as well.'
								placement='right'
								arrow
							>
								<div>
									<i className='uil uil-info-circle info__icon'></i>
								</div>
							</LightTooltip>
						</Grid>
					</Grid>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
					>
						Submit
					</Button>
				</form>
			</Container>
		</div>
	);
};
