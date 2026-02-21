import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    studentCoordinator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    maxSeats: {
      type: Number,
      required: true,
    },

    registeredCount: {
      type: Number,
      default: 0,
    },

    registrationDeadline: {
      type: Date,
      required: true,
    },

    eventDate: {
      type: Date,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Event ||
  mongoose.model("Event", eventSchema);