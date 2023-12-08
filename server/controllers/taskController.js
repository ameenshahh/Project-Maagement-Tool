const TaskModel = require("../models/TaskModel");
const { validationResult } = require("express-validator");

exports.addTask = async (req, res) => {
  // input validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  try {


    // Create a new task using the TaskModel schema
    const task = new TaskModel(req.body);
    await task.save();

    res
      .status(201)
      .json({ status: true, message: "Task added successfully", data: task });
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: false, message: "Error adding task" });
  }
};

// Function to get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    // Retrieve all tasks from the database
    const tasks = await TaskModel.find({ projectId: req.params.projectId });
    res.status(200).json({ status: true, data: tasks });
  } catch (error) {
    res.status(500).json({ status: false, message: "Error fetching tasks" });
  }
};

// Function to update a task
exports.editTask = async (req, res) => {
  // input validation

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  try {
    const { name, description, projectId, status } = req.body;
    // Update an existing task by its ID
    const updatedTask = await TaskModel.findByIdAndUpdate(
      req.params.taskId,
      { name, description, projectId, status },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ status: false, message: "task not found" });
    }
    res.status(200).json({
      status: true,
      message: "task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Error updating task" });
  }
};

// Function to delete a Task
exports.deleteTask = async (req, res) => {
  // input validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  try {
    // Delete a Task by its ID
    const deletedTask = await TaskModel.findByIdAndDelete(req.params.taskId);
    if (!deletedTask) {
      return res.status(404).json({ status: false, message: "Task not found" });
    }
    res.status(200).json({
      status: true,
      message: "Task deleted successfully",
      data: deletedTask,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Error deleting Task" });
  }
};
