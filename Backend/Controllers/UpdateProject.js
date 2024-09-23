const User = require("../Models/User");
const Project = require("../Models/Project");

exports.updateProject = async (req,res) => {
    try{
        let { userID, projectID, htmlCode, cssCode, jsCode } = req.body;

        if(!userID || !projectID  || !htmlCode || !cssCode || !jsCode){
            return res.status(401).json({
                success  : false,
                message : "Enter All Information"
            })
        }

        const userData = await User.findById(userID);

        if(!userData){
            return res.status(402).json({
                success : false,
                message : "User Not Found"
            })
        }

        const projectData = await Project.findById(projectID);

        if(!projectData){
            return res.status(403).json({
                success : false,
                message : "Project Not Found"
            })
        }

        const updatedProjectData = await Project.findByIdAndUpdate(
            { _id : projectID },
            { htmlCode : htmlCode, cssCode : cssCode, jsCode : jsCode },
            { new : true }
        );

        return res.status(200).json({
            success : true,
            message: "Project updated successfully",
            project : updatedProjectData
        })
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Something went Wrong"
        })
    }
}