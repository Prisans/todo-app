const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
      index: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    labels: [
      {
        type: String,
        trim: true,
      },
    ],
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Compound index for efficient user task fetching
todoSchema.index({ userId: 1, completed: 1 });
todoSchema.index({ userId: 1, dueDate: 1 });

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;