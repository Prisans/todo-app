const express = require("express")
const {createTodo,getTodos,updateTodo,deleteTodo} = require("../controllers/todoControllers")
const router = express.Router()

router.post("/" , createTodo)
router.get("/", getTodos)
router.patch("/:id" , updateTodo) 
router.delete("/:id", deleteTodo)


module.exports = router