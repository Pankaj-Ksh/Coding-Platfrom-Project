const express = require("express");
const route = express.Router();

const { signup } = require("../Controllers/SignUp");
const { login } = require("../Controllers/Login");

route.post("/signup", signup);
route.post("/login", login);

module.exports = route;