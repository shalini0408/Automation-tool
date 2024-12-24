import { app } from "./app";
import Mongoose from "mongoose";
import dotenv from "dotenv";
import { init } from './lib/workers';
dotenv.config();

const connectDB = async () => {
  try {
    await Mongoose.connect(process.env.MONGO_ANSIBLE_SERVICE_URL!);
    console.log("MongoDB Connected...");
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

// Queue upcoming deployments
init(() => {
  console.log("Started workers")
})

app.listen(5000, async () => {
  await connectDB();
  console.log("started...");
});
