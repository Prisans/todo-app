const mongoose = require("mongoose")

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("db connnected")
    }
    catch(error){
        console.error("CRITICAL ERROR: MongoDB connection failed.");
        console.error("Error Message:", error.message);
        console.error("Ensure MONGO_URI is correctly set in environment variables.");
        process.exit(1)
    }
}

module.exports = connectDB