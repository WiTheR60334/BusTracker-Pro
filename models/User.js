import mongoose from "mongoose";

const {Schema} = mongoose;

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
      role: {
        type: String,
        enum: ['admin', 'student', 'driver'], 
        default: 'student', 
      },
    },
    { collection: 'users' },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);