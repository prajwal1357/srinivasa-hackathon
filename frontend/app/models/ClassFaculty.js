const mongoose = require("mongoose");

const classFacultySchema = new mongoose.Schema(
  {
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty", // should be admin role
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate assignment of same faculty to same class
classFacultySchema.index({ class: 1, faculty: 1 }, { unique: true });

module.exports = mongoose.model("ClassFaculty", classFacultySchema);