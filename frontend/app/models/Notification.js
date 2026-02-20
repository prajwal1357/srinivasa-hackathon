const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // Can reference either Faculty or Student
    },

    recipientModel: {
      type: String,
      required: true,
      enum: ["Student", "Faculty"],
    },

    type: {
      type: String,
      enum: ["student_approval", "faculty_approval"],
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    relatedUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // The student or faculty waiting for approval
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);