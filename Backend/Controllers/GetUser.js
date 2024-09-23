const User = require("../Models/User");

exports.getUser = async (req,res) => {
    try{
        const { userID } = req.body;

        if(!userID){
            return res.status(404).json({
                success : false,
                message : "Enter Valid user ID"
            })
        }

        const userData = await User.findOne({_id : userID});
        userData.password = undefined;
        
        if(!userData){
            return res.status(403).json({
                success : false,
                message : "Data Not Found"
            })
        }

        return res.status(200).json({
            success : true,
            message : "User details fetched successfully",
            user : userData
        })
    }   
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Something went wrong"
        })
    }
}