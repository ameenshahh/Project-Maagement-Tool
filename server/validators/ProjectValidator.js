const { body, param, validationResult } = require("express-validator");

exports.addProjectValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("teamMembers").notEmpty().withMessage("Team member field is required"),
];

exports.getProjectByIdValidator = [
  param("projectId").isMongoId().withMessage("Invalid project ID"),
];






