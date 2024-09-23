const User = require("../Models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

exports.login = async (req,res) => {
    try{
        const { email, pwd } = req.body;

        if(!email || !pwd){
            return res.status(404).json({
                success : false,
                message : "Please Fill all details Carefully"
            })
        }

        if(!email.endsWith("@gmail.com")){
            return res.status(403).json({
                success : false,
                message : "Enter Valid gmail"
            })
        }

        const userExist = await User.findOne({email});
        if(!userExist){
            return res.status(400).json({
                success : false,
                message : `User Not Signed with given email : ${email}  Please SignIn Before Login`
            })
        }


        if(await bcrypt.compare(pwd, userExist.password)){
            const playload = {
                email : userExist.email,
                id : userExist._id,
            }

            const token = jwt.sign(playload, process.env.JWT_SECRET, {expiresIn : "3h"})

            userExist.token = token;
            userExist.password = undefined;

            const options = {
                expires : new Date(Date.now() + 3*24*60*60*1000),
                httpnly : true
            }

            res.cookie("token", token, options).status(200).json({
                success : true,
                message : "User Logged Successfully",
                token,
                userExist
            })
        }
        else{
            return res.status(401).json({
                success : false,
                message : "Password is Incorrect, Please Try Again"
            })
        }

    }
    catch(error){
        return res.status(501).json({
            success : false,
            message : "Error in Login the User"
        })
    }
}