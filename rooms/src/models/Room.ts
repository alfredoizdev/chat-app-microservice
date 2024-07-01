import mongoose, { Document, Schema } from "mongoose";
import { hashPassword } from "../common/password";

export interface IRoom extends Document {
  rooms: string[];
}

const RoomSchema: Schema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    rooms: { type: [String], default: [] },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  }
);

const Room = mongoose.model<IRoom>("Room", RoomSchema);

export default Room;
