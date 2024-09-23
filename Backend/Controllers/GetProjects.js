const User = require("../Models/User");
const Project = require("../Models/Project");

exports.getProjects = async (req,res) => {
    try{
        let { userID } = req.query;

        if(!userID){
            return res.status(402).json({
                success : false,
                message : "Enter User id"
            })
        }

        const userInfo = await User.findById(userID);
        
        if(!userInfo){
            return res.status(403).json({
                success : false,
                message : "User Data Not Found"
            })
        }

        const allProjects = await Project.find({createdBy : userID});
 
        return res.status(200).json({
            success : true,
            message : "Projects fetched successfully",
            projects : allProjects
        })
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : `Something went Wrong ${error}`
        })
    }
}