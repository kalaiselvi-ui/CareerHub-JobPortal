import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 6,
    },
    role: {
      type: String,
      enum: ["candidate", "recruiter"],
      default: "candidate",
    },
    resetPasswordToken: String,
    resetPasswordExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
});

const User = mongoose.model("User", userSchema);

export default User;
