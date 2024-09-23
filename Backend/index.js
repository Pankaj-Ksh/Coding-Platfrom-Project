const express = require("express");

const authRoutes = require("./Routes/Auth");
const userRoutes = require("./Routes/User");
const projectRoute = require("./Routes/Project");

const database = require('./Config/database');

const cookiesParser = require("cookie-parser");

const cors = require("cors");

const dotenv = require("dotenv");

const PORT = process.env.PORT || 3000;

dotenv.config();

database.Connect();

const app = express();

app.use(express.json());
app.use(cookiesParser());

app.use(
    cors({
        origin : process.env.FRONTEND_API,
        credentials : true
    })
)

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/project", projectRoute);

app.get("/", (req,res) => {
    return res.json({
        success : true,
        message : "Your server is up and running...."
    })
})

app.listen(PORT, ()=> {
    console.log(`App is runnng on ${PORT}`);
});