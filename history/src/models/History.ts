import mongoose, { Document, Schema } from "mongoose";

export interface IHistory extends Document {
  senderId: string;
  receiverId: string;
  lastSenderId: string;
  message: string;
  type: string;
}

const HistorySchema: Schema = new Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    lastSenderId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: "text",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
      },
    },
  }
);

HistorySchema.pre("save", function (next) {
  if (!this._id) {
    this._id = new mongoose.Types.ObjectId();
  }
  next();
});

const History = mongoose.model<IHistory>("History", HistorySchema);

export default History;
