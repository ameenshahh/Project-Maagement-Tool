const { body, param, validationResult } = require("express-validator");

exports.addTaskValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("projectId").notEmpty().withMessage("Project Id is required"),
];

exports.editTaskValidator = [
  param("taskId")
    .notEmpty()
    .withMessage("Task Id is required")
    .isMongoId()
    .withMessage("Invalid project ID"),
];

exports.deleteTaskValidator = [
  param("taskId")
    .notEmpty()
    .withMessage("Task Id is required")
    .isMongoId()
    .withMessage("Invalid project ID"),
];
