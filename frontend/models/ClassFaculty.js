import mongoose from "mongoose";

const classFacultySchema = new mongoose.Schema(
  {
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate assignment
classFacultySchema.index({ class: 1, faculty: 1 }, { unique: true });

export default mongoose.models.ClassFaculty ||
  mongoose.model("ClassFaculty", classFacultySchema);