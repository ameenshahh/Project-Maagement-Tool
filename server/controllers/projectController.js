const ProjectModel = require("../models/ProjectModel");
const { validationResult } = require("express-validator");

// Function to add a new project
exports.addProject = async (req, res) => {
  // input validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  try {
    // Create a new project using the ProjectModel schema

    const { name, description, teamMembers } = req.body;

    teamMembers.push(req.user._id)
   
    const project = new ProjectModel({ name, description, teamMembers });
    await project.save();

    res
      .status(201)
      .json({
        status: true,
        message: "Project added successfully",
        data: project,
      });
  } catch (error) {
    res.status(500).json({ status: false, message: "Error adding project" });
  }
};

// Function to get all projects
exports.getAllProjects = async (req, res) => {
  try {
    // Retrieve all projects from the database
    const projects = await ProjectModel.find();
    res.status(200).json({ status: true, data: projects });
  } catch (error) {
    res.status(500).json({ status: false, message: "Error fetching projects" });
  }
};

// Function to get a project by its ID
exports.getProjectById = async (req, res) => {
  // input validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  try {
    // Find a project by its unique ID
    const project = await ProjectModel.findById(req.params.projectId);
    if (!project) {
      return res
        .status(404)
        .json({ status: false, message: "Project not found" });
    }
    res
      .status(200)
      .json({
        message: "Project details received successfully",
        data: project,
      });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Error fetching project details" });
  }
};
