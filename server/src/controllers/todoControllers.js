const todoService = require("../services/todoService");
const catchAsync = require("../utils/catchAsync");

// create todo
const createTodo = catchAsync(async (req, res) => {
  const { title } = req.body;
  if (!title || title.trim().length === 0) {
    return res.status(400).json({ success: false, message: "title is required" });
  }

  const newTodo = await todoService.createTodo(req.user.id, req.body);
  res.status(201).json({ success: true, data: newTodo });
});

// read all todos
const getTodos = catchAsync(async (req, res) => {
  const todoData = await todoService.getAllTodos(req.user.id);
  res.status(200).json({ success: true, data: todoData });
});

// update todos
const updateTodo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedTodo = await todoService.updateTodo(id, req.user.id, req.body);

  if (!updatedTodo) {
    return res.status(404).json({ success: false, message: "Todo not found or unauthorized" });
  }

  res.status(200).json({ success: true, data: updatedTodo });
});

// deleting todo
const deleteTodo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deletedItem = await todoService.deleteTodo(id, req.user.id);

  if (!deletedItem) {
    return res.status(404).json({ success: false, message: "Todo not found or unauthorized" });
  }

  res.status(200).json({
    success: true,
    message: "deleted successfully",
    data: deletedItem,
  });
});

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};