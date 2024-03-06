import mongoose, { Document, Model } from "mongoose";

interface IUser {
  username: string;
  name: string | null;
  email: string;
  avatar?: string | null;
  role: string;
}

export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      default: "user",
    },

    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUserDocument> =
  mongoose.models?.User || mongoose.model<IUserDocument>("User", userSchema);

export default User;
