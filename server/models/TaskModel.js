const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    status: {
      type: String,
      default: "pending", 
    },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = TaskModel;
