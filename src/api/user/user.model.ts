import mongoose, { Document, model, Schema } from "mongoose";
import { IUser } from "./user.types";

const userSchema = new Schema<IUser & Document>({
  username: { type: String, required: true, minlength: 3, maxlength: 30 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  role: {
    type: String,
    enum: ["supAdmin", "admin", "player", "coach"],
    required: true,
  },
});

const User = mongoose.model<IUser & Document>("User", userSchema);

export default User;
