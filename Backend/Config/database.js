const mongoose = require("mongoose");

exports.Connect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
    .then(() => {
        console.log("DB Connection is Done Successfully");
    })
    .catch((error) => {
        console.log("Error in Connecting to DB : ", error);
        process.exit(1);
    })
}