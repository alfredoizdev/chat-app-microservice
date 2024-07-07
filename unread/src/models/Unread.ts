import mongoose, { Document, Schema } from "mongoose";

export interface IUnread extends Document {
  senderId: string;
  receiverId: string;
  unreadReceived: number;
  unreadSender: number;
}

const UnreadSchema: Schema = new Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    unreadReceived: {
      type: Number,
      required: true,
      default: 0,
    },
    unreadSender: {
      type: Number,
      required: true,
      default: 0,
    },
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

const Unread = mongoose.model<IUnread>("Unread", UnreadSchema);

export default Unread;
