const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
    title : {
        type : String,
        trim : true,
        required : [true,"Title is required"],
        minlength : 1
    },
    completed : {
        type : Boolean,
        default : false
    }
},{timestamps : true})

const Todo = mongoose.model("Todo",TodoSchema)

module.exports = Todo