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

//read all todos
async function getTodos(req,res){
    try{
        const todoData = await Todo.find({})
        return res.status(200).json({success : true , data : todoData})
    }catch(error){
        return res.status(500).json({error : "invalid server error"})
    }
}

//update todos 

async function updateTodo(req,res){
    try{
        const {id} = req.params
        // console.log(todoId, typeof todoId)
        const updatedTodo = await Todo.findByIdAndUpdate(id, {title : "my first todo got updated-22---89"},{ new: true })

        return res.status(200).json({status : true , data : updatedTodo})

    }catch(error){
        return res.status(500).json({error : error.message || "inr"})
    }
}

//deleting todo

async function deleteTodo(req,res){
    try{
        const {id} = req.params
        console.log(todoId)
        const deletedItem = await Todo.findByIdAndDelete(id)
        return res.status(200).json({status : true , message : "deleted successfully" , data:deletedItem})
    }catch(error){
        return res.status(500).json({error :error})
    }
}

module.exports = {createTodo,getTodos,updateTodo,deleteTodo}