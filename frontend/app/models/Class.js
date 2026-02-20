const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      // Example: "1st BCA A"
    },

    year: {
      type: String,
      enum: ["1st", "2nd", "3rd"],
      required: true,
    },

    program: {
      type: String,
      default: "BCA",
    },

    section: {
      type: String,
      required: true,
      trim: true,
      // Example: "A", "B"
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty", // should be admin role faculty
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate class like "1st BCA A"
classSchema.index({ year: 1, program: 1, section: 1 }, { unique: true });

module.exports = mongoose.model("Class", classSchema);