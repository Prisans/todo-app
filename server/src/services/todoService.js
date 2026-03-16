const Todo = require("../models/Todo");

const createTodo = async (userId, todoData) => {
  return await Todo.create({ 
    userId, 
    ...todoData,
    title: todoData.title.trim() 
  });
};

const getAllTodos = async (userId) => {
  return await Todo.find({ userId }).sort({ createdAt: -1 });
};

const updateTodo = async (id, userId, updateData) => {
  return await Todo.findOneAndUpdate(
    { _id: id, userId }, 
    updateData, 
    { new: true, runValidators: true }
  );
};

const deleteTodo = async (id, userId) => {
  return await Todo.findOneAndDelete({ _id: id, userId });
};

module.exports = {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
};
