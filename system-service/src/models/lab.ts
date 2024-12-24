import { model, Schema, SchemaTypes } from "mongoose";
import System from "./system";

export interface Lab extends Document {
	name: string;
	branch: string;
	category: string;
	systems: [string];
}

const LabSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		branch: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		systems: [
			{
				type: SchemaTypes.ObjectId,
				ref: System,
			},
		],
	},
	{
		timestamps: {
			createdAt: "createdAt",
			updatedAt: "updatedAt",
		},
	}
);

const Lab = model("labs", LabSchema, "labs");

export default Lab;
