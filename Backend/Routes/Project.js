const express = require("express");
const route = express.Router();

const { createProject } = require("../Controllers/CreateProject");
const { getProjects } = require("../Controllers/GetProjects");
const { deleteProject } = require("../Controllers/DeleteProject");
const { getProject } = require("../Controllers/getProject");
const { updateProject } = require("../Controllers/UpdateProject");

route.post("/createproject", createProject);
route.get("/getprojects", getProjects);
route.delete("/deleteproject", deleteProject);
route.get("/getproject", getProject);
route.put("/updateproject", updateProject);

module.exports = route;