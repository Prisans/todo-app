const mongoose = require("mongoose")

async function connectDB(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/todoDB")
        console.log("db connnected")
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB