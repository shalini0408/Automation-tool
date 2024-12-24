import mongoose, { Schema } from "mongoose";

const SystemSchema = new Schema(
	{
		systemName: {
			type: String,
			required: true,
		},
		privateKey: {
			type: Buffer,
		},
		fileName: {
			type: String,
		},
		mimeType: {
			type: String,
		},
		userName: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		ipAddress: {
			type: String,
			required: true,
		},
		rom: {
			type: String,
		},
		ram: {
			type: String,
		},
		OS: {
			type: String,
		},
	},
	{
		timestamps: {
			createdAt: "createdAt",
			updatedAt: "updatedAt",
		},
	}
);

const System = mongoose.model("System", SystemSchema, "system");
// || mongoose.model("system", SystemSchema, "system");

export default System;
