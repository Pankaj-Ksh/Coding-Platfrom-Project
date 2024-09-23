const express = require("express");
const route = express.Router();

const { getUser } = require("../Controllers/GetUser");

route.get("/getuser", getUser);

module.exports = route;