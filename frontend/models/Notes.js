import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    semester: {
      type: Number,
      required: true,
    },

    unit: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: ["note", "assignment"],
      required: true,
    },

    dueDate: {
      type: Date, // Only required if type === "assignment"
    },

    fileUrl: {
      type: String,
      required: true,
    },

    fileType: {
      type: String, // pdf, doc, ppt, png
      required: true,
    },

    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Note ||
  mongoose.model("Note", noteSchema);