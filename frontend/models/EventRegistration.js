import mongoose from "mongoose";

const eventRegistrationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate registration
eventRegistrationSchema.index(
  { event: 1, student: 1 },
  { unique: true }
);

export default mongoose.models.EventRegistration ||
  mongoose.model("EventRegistration", eventRegistrationSchema);