import { app } from "./app";
import Mongoose from "mongoose";
require("dotenv").config();

const nodemailer = require("nodemailer");

console.log("gmail", process.env.GMAIL_EMAIL);
console.log(process.env.GMAIL_PASSWORD);

let transporter;
const start = async () => {
  //* can add other options or configurations, like connecting to the database

  try {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
  } catch (err) {
    console.log(err);
  }

  try {
    await Mongoose.connect(process.env.MONGO_CONNECTION_URL!);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }

  app.listen(5000, () => {
    console.log("started...");
  });
};

export { transporter };

start();
