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
    } catch (error) {
        console.error("Create Todo Error:", error)
        return res.status(500).json({ success: false, error: error.message || "Internal Server Error" })
    }

    
}

//read all todos
async function getTodos(req,res){
    try{
        const todoData = await Todo.find({})
        return res.status(200).json({success : true , data : todoData})
    } catch (error) {
        console.error("Get Todos Error:", error)
        return res.status(500).json({ success: false, error: error.message || "Internal Server Error" })
    }
}

//update todos 

async function updateTodo(req,res){
    try{
        const {id} = req.params
        const updatedTodo = await Todo.findByIdAndUpdate(id, {title : req.body.title , completed : req.body.completed},{ new: true , runValidators : true})

        if(!updatedTodo){
            return res.status(404).json({success : false})
        }

        return res.status(200).json({success : true , data : updatedTodo})

    } catch (error) {
        console.error("Update Todo Error:", error)
        return res.status(500).json({ success: false, error: error.message || "Internal Server Error" })
    }
}

//deleting todo

async function deleteTodo(req,res){
    try{
        const {id} = req.params
        const deletedItem = await Todo.findByIdAndDelete(id)
        if(!deletedItem){
            return res.status(404).json({success : false})
        }

        return res.status(200).json({success : true , message : "deleted successfully" , data:deletedItem})
    } catch (error) {
        console.error("Delete Todo Error:", error)
        return res.status(500).json({ success: false, error: error.message || "Internal Server Error" })
    }
}

module.exports = {createTodo,getTodos,updateTodo,deleteTodo}