const nodemailer = require("nodemailer");

const mailSender = async function(email, title, body){
    try{
        let transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS
            }
        })

        let info = await transporter.sendMail({
            from : 'Code Fusion - by Pankaj Kshirsagar',
            to : `${email}`,
            subject : `${title}`,
            html : `${body}`
        })

        // console.log("Data Stored in Info Variable is :", info);

        return info;
    }
    catch(error){
        console.log("Error in mailSender Function :", error);
    }
}
module.exports = mailSender;