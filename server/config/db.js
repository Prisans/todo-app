const mongoose = require("mongoose")

async function connectDB(retries = 3){
    const maskedUri = process.env.MONGO_URI ? process.env.MONGO_URI.replace(/:([^@]+)@/, ":****@") : "MISSING";
    console.log(`Attempting to connect to DB... (Masked URI: ${maskedUri})`);

    while (retries > 0) {
        try{
            await mongoose.connect(process.env.MONGO_URI)
            console.log("db connected successfully")
            return;
        }
        catch(error){
            retries--;
            console.error(`DB connection attempt failed. ${retries} retries left.`);
            console.error("Error Message:", error.message);
            
            if (retries === 0) {
                console.error("CRITICAL ERROR: All MongoDB connection attempts failed.");
                console.error("1. Check if MONGO_URI is set correctly in Render environment variables.");
                console.error("2. IMPORTANT: Ensure your MongoDB Atlas Network Access allows connections from '0.0.0.0/0' (Render's dynamic IPs).");
                process.exit(1)
            }
            // Wait 2 seconds before retrying
            await new Promise(res => setTimeout(res, 2000));
        }
    }
}

module.exports = connectDB