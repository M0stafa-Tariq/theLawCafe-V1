import mongoose from "mongoose";

const caseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, unique: true, trim: true },
    phoneNumber: { type: String },
    numberOfCase: { type: String, required: true },
    caseFile: { secure_url: String, public_id: String },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lawyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.models.Case || mongoose.model("Case", caseSchema);