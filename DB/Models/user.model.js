import mongoose from "mongoose";
import { genderType, systemRoles } from "../../src/utils/system-enums.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      tirm: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      tirm: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    phoneNumber: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: Object.values(systemRoles),
      default: systemRoles.CLIENTE,
    },

    age: {
      type: Number,
      min: 21,
      max: 100,
    },

    gender: {
      type: String,
      enum: Object.values(genderType),
      required: true,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    isLoggedIn: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    token: String,

    forgetCode: String,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
