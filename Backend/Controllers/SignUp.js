const mailSender = require("../Config/MailSender");
const User = require("../Models/User")
const bcrypt = require("bcrypt")
const signupConfirmation = require("../EmailTemplate/signupConfirmation");

exports.signup = async (req,res) => {
    try{
        const {username, name, email, pwd} = req.body;

        if(!username || !name || !email || !pwd){
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
        if(userExist){
            return res.status(400).json({
                success : false,
                message : `User Already Signed with given email : ${email}`
            })
        }

        if(pwd.length <= 5){
            return res.status(402).json({
                success : false,
                message : "Password length must of 6 character."
            })
        }

        let hashPassword = await bcrypt.hash(pwd, 10);

        const user = await User.create({
            username : username,
            name : name,
            email : email,
            password : hashPassword
        })

        try{
            const emailResponse = await mailSender(
                user.email,
                "Welcome to Code Fusion, your account has been successfully created."
            )
        }
        catch(error){
            return res.status(500).json({
                success : false,
                message : "Error occurred while sending email",
                error : error.message
            })
        }

        return res.status(200).json({
            success : true,
            message : 'You is registered successfully. Please check your email to confirm your registration.',
            user
        })

    }   
    catch(error){
        console.log("SignUp Error is : ", error);
        return res.status(500).json({
            success : false,
            message : "User not registrered. Please try again"
        })
    }
}