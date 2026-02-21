const Todo = require("../models/Todo")
// create todo

async function createTodo(req,res){
    const {title} = req.body

    try{
        if(!title || title.trim().length === 0){
            return res.status(400).json({success : false , message : "title is required"})
        }
        const trimmedTitle = title.trim()
        const newTodo = await Todo.create({title : trimmedTitle})
    
        return res.status(201).json({success : true , data : newTodo})
    }catch(error){
        return res.status(500).json({error : "Invalid Server Error"})
    }

    
}

module.exports = {
    createTodo
}