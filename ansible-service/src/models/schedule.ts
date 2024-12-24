import { Schema, Model, Document, models, Mongoose, model } from "mongoose";

interface ScheduleAttrs {
  topic: string;
  scheduledBy: Schema.Types.ObjectId;
  from: Date;
  to: Date;
  labId: Schema.Types.ObjectId;
  imageId: Schema.Types.ObjectId;
  taskId: string;
}

export interface ScheduleI extends Document {
  topic: string;
  scheduledBy: Schema.Types.ObjectId;
  from: Date;
  to: Date;
  labId: Schema.Types.ObjectId;
  taskId: string;
  imageId: Schema.Types.ObjectId;
}

export interface ScheduleModelI extends Model<ScheduleI> {
  build(attrs: ScheduleAttrs): ScheduleI;
}

const ScheduleSchema = new Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    scheduledBy: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
    labId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    imageId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    taskId: {
      type: String,
      unique: true,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Schedule = model<ScheduleI, ScheduleModelI>("schedule", ScheduleSchema);
export default Schedule;
