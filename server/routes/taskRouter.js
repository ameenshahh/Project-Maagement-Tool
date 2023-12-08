const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth");
const {
  addTaskValidator,
  editTaskValidator,
  deleteTaskValidator,
} = require("../validators/TaskValidator");

const {
  addTask,
  getAllTasks,
  editTask,
  deleteTask,
} = require("../controllers/taskController");

router.post("/add/", authenticate, addTaskValidator, addTask);
router.get("/all/:projectId", getAllTasks);
router.put("/edit/:taskId", authenticate, editTaskValidator, editTask);
router.delete(
  "/delete/:taskId",
  authenticate,
  deleteTaskValidator,
  deleteTask
);

module.exports = router;
