import { app } from "./app";
import axios from "axios";
import Mongoose from "mongoose";
require("dotenv").config();

const start = async () => {
	//* can add other options or configurations, like connecting to the database

	await Mongoose.connect(process.env.MONGO_CONNECTION_URL!, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false,
	});

	await app.listen(5000, () => {
		console.log("started...");
	});
};

start();
