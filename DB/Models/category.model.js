import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, unique: true, trim: true },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true}, //admin
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //admin
  },
  { timestamps: true }
);

export default mongoose.models.Category || mongoose.model("Category", categorySchema);
