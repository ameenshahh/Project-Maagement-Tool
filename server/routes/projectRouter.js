const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth");
const {
 addProjectValidator,
 getProjectByIdValidator
} = require("../validators/ProjectValidator");

const {
    addProject, getAllProjects, getProjectById
} = require("../controllers/projectController");

router.post("/add", authenticate, addProjectValidator, addProject);
router.get("/all", getAllProjects);
router.get("/get/:projectId", authenticate, getProjectByIdValidator, getProjectById);


module.exports = router;
