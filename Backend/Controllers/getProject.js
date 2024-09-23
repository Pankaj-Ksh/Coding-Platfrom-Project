const User = require("../Models/User");
const Project = require("../Models/Project");

exports.getProject = async (req,res) => {
    try{
        let { userID, projectID } = req.query;;

        if(!userID || !projectID){
            return res.status(402).json({
                success : false,
                message : "Enter User and Project ID"
            })
        }

        const userInfo = await User.findById(userID);
        
        if(!userInfo){
            return res.status(403).json({
                success : false,
                message : "User Data Not Found"
            })
        }

        const ProjectInfo = await Project.findById(projectID);
 
        return res.status(200).json({
            success : true,
            message : "Project fetched successfully",
            project : ProjectInfo
        })
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : `Something went Wrong ${error}`
        })
    }
}