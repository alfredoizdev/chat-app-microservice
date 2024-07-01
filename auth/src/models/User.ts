import mongoose, { Document, Schema } from "mongoose";
import { hashPassword } from "../common/password";

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
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

UserSchema.pre("save", function (next) {
  if (!this._id) {
    this._id = new mongoose.Types.ObjectId();
  }
  next();
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.set("password", hashPassword(this.get("password") as string));
  }
  next();
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
