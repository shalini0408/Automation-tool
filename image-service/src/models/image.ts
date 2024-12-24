import { model, Schema, SchemaTypes } from "mongoose";

export interface ImageI extends Document {
  userId: string;
  imageId: string;
  repo: string;
  registryUser: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
}

const imageSchema = new Schema(
  {
    userId: {
      type: SchemaTypes.ObjectId,
      ref: "Users",
    },
    imageId: {
      type: String,
      unique: true,
      required: true,
    },
    repo: {
      type: String,
      unique: true,
      required: true,
    },
    registryUser: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const ImageModel = model<ImageI>("images", imageSchema);

export default ImageModel;
