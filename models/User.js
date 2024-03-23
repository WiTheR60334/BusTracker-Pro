import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    email: {
        type: String,
        unique: true,
        required: true,
      },
      password: {
        type: String,
        required: false,
      },
    },
    { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;