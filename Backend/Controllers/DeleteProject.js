const User = require("../Models/User");
const Project = require("../Models/Project");

exports.deleteProject = async (req,res) => {
    try{
        const { projectID, userID } = req.body;

        if(!projectID || !userID){
            return res.status(402).json({
                success : false,
                message : "Enter Project and User ID Both"
            })
        }

        const userData = await User.findById(userID);
        if(!userData){
            return res.status(403).json({
                success : false,
                message : "User Not Found"
            })
        }

        const projectData = await Project.findById(projectID);
        if(!projectData){
            return res.status(404).json({
                success : false,
                message : "Project Not Found"
            })
        }

        const projectDeleteData = await Project.findByIdAndDelete(projectID);

        return res.status(200).json({
            success : true,
            message : "Project deleted successfully"
        })

    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "something went wrong while Deleting project"
        })
    }
}