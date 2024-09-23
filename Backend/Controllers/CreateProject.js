const User  = require("../Models/User");
const Project  = require("../Models/Project");

exports.createProject = async (req, res) => {
    try {
        let { title, userID } = req.body;

        if (!title || !userID) {
            return res.status(400).json({
                success: false,
                message: "Enter title name and provide userID",
            });
        }

        const userData = await User.findById(userID);

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User data not found",
            });
        }

        let projectInfo = await Project.create({
            title: title,
            createdBy: userID,
        });

        return res.status(200).json({
            success: true,
            message: "Project created successfully",
            projectInfo,
        });
    } 
    catch (error) {

        return res.status(500).json({
            success: false,
            message: `Something went wrong: ${error.message}`,
        });
    }
};
